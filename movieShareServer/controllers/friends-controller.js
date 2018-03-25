const async = require('async');
const User = require('mongoose').model('User');
const Notification = require('mongoose').model('Notification');
const jwt = require('jsonwebtoken');

module.exports = {
    searchForUserByUsername: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            User.findOne({username: req.body.username}).then(data => {
                let user = {
                    username: data.username,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    id: data._id
                };
                return res.json({
                    success: true,
                    user: user
                })
            }).catch(err => {
                return res.json({
                    success: false,
                    message: err.message
                })
            })

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    },
    getAllFriends: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);


            User.findOne({username: req.params.username}).then(user => {
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    });
                }

                User.getFriends(user._id, function (err, friendships) {
                    let friendsArr = [];
                    friendships.map(data => {
                        if (data.status === 'accepted') {
                            friendsArr.push({
                                _id: data._id,
                                username: data.friend.username,
                                firstName: data.friend.firstName,
                                lastName: data.friend.lastName
                            })
                        }
                    });

                    return res.status(200).json({
                        success: true,
                        friends: friendsArr
                    })
                })
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            })
        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    },
    sendFriendRequest: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            async.waterfall([
                function (done) {
                    let senderId = '';
                    let recipientId = '';

                    User.findOne({username: req.body.sender}).then(user => {
                        if (!user) {
                            return res.status(404).json({
                                success: false,
                                message: 'User not found'
                            });
                        }

                        senderId = user._id;

                        User.findOne({username: req.body.recipient}).then(user => {
                            // console.log(user);
                            if (!user) {
                                return res.status(404).json({
                                    success: false,
                                    message: 'User not found'
                                });
                            }

                            recipientId = user._id;

                            User.requestFriend(senderId, recipientId);

                            Notification.create({
                                sender: req.body.sender,
                                recipient: req.body.recipient,
                                title: 'Friend request',
                                text: `${req.body.sender} wants to be friends`,
                                expirationDate: Date.now() + 2592000000, // 30 days
                                isRead: false
                            });

                            return res.status(200).json({
                                success: true,
                                message: 'Friend request sent'
                            });
                        }).catch(err => {
                            res.status(404).json({
                                success: false,
                                message: 'User not found'
                            })
                        });
                    }).catch(err => {
                        res.status(404).json({
                            success: false,
                            message: 'User not found'
                        })
                    });

                }
            ], function (err) {
                if (err) {
                  return res.json({
                      success: false,
                      message: err.message
                  })
                }
            });

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }

    },
    acceptFriendRequest: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            let notificationId = req.body.id;

            async.waterfall([
                function (done) {
                    let senderId = '';
                    let recipientId = '';

                    User.findOne({username: req.body.sender}).then(user => {
                        if (!user) {
                            return res.status(404).json({
                                success: false,
                                message: 'User not found'
                            });

                        }

                        senderId = user._id;

                        User.findOne({username: req.body.recipient}).then(user => {
                            // console.log(user);
                            if (!user) {
                                return res.status(404).json({
                                    success: false,
                                    message: 'User not found'
                                });
                            }

                            recipientId = user._id;

                            User.requestFriend(senderId, recipientId, function notify() {
                                Notification.create({
                                    sender: req.body.sender,
                                    recipient: req.body.recipient,
                                    title: 'Friend accepted',
                                    text: `You are now friends with ${req.body.sender}`,
                                    expirationDate: Date.now() + 2592000000, // 30 days
                                    isRead: false
                                });
                                Notification.findByIdAndUpdate({_id: notificationId}).then(data => {
                                    data.isRead = true;
                                    data.save();

                                }).catch(err => {
                                    console.log(err);
                                });
                            });

                            User.find({_id: senderId}).then(data => {
                                let friendId = recipientId.toString();
                                data[0].friendsArr.push(friendId);
                                data[0].save();

                                // let currentFriends = [];
                                //
                                // for (let obj of data[0].friendsArr) {
                                //     currentFriends.push(obj.toString());
                                // }
                                // console.log(currentFriends);
                                // data[0].save();

                            });
                            User.find({_id: recipientId}).then(data => {
                                let friendId = senderId.toString();
                                data[0].friendsArr.push(friendId.toString());
                                data[0].save();
                            });
                            return res.status(200).json({
                                success: true,
                                message: 'You are now friends'
                            });
                        }).catch(err => {
                            res.status(404).json({
                                success: false,
                                message: 'User not found'
                            })
                        });
                    }).catch(err => {
                        return res.status(404).json({
                            success: false,
                            message: 'User not found'
                        })
                    });
                }
            ], function (err) {
                if (err) {
                  return  res.status(404).json({
                        success: false,
                        message: err.message
                    })
                }
            });


        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }

    },
    removeFriend: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);
            let senderId = '';
            let recipientId = '';

            let senderFriendsArr = [];
            let recipientFriendsArr = [];

            User.findOne({username: req.body.sender}).then(sender => {
                if (!sender) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    });
                }

                senderId = sender._id;

                User.findOne({username: req.body.recipient}).then(recipient => {
                    recipientId = recipient._id;

                    if (!recipient) {
                        return res.status(404).json({
                            success: false,
                            message: 'User not found'
                        });
                    }

                    for (let friend of sender.friendsArr) {
                        if (friend[0].toString() !== recipientId.toString()) {
                            // console.log(`${friend[0]} = ${recipientId}`);
                            senderFriendsArr.push(friend);
                        }
                    }

                    for (let friend of recipient.friendsArr) {
                        if (friend[0].toString() !== senderId.toString()) {
                            recipientFriendsArr.push(friend);
                        }
                    }

                    sender.friendsArr = senderFriendsArr;
                    recipient.friendsArr = recipientFriendsArr;
                    sender.save();
                    recipient.save();

                    User.removeFriend(senderId, recipientId);
                    return res.status(200).json({
                        success: true,
                        message: 'Friend removed'
                    });
                }).catch(err => {
                    res.status(404).json({
                        success: false,
                        message: err.message
                    })
                });
            }).catch(err => {
                res.status(404).json({
                    success: false,
                    message: err.message
                })
            });

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    },
    getNotificationsByUsername: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];
        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            Notification.find({recipient: req.body.recipient}).then(data => {
                data.map(notif => {
                    let currentTime = new Date;
                    if ((Number(notif.expirationDate.getTime()) < Number(currentTime.getTime())) && notif.isRead === true) {
                        Notification.findByIdAndRemove(notif._id).then(data2 => {
                            console.log(data2);
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                });

                return res.status(200).json({
                    success: true,
                    notifications: data
                })
            }).catch(err => {
                return res.json({
                    success: false,
                    message: err.message
                });
            })
        } catch (err) {
            return res.json({
                success: false,
                message: 'Invalid token'
            })
        }

    },
    markNotificationAsRead: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            let notificationId = req.params.id;

            Notification.findByIdAndUpdate({_id: notificationId}).then(data => {
                data.isRead = true;
                data.save();
                return res.status(200).json({
                    success: true,
                    status: 'Notification is now read',
                    isRead: true
                })
            }).catch(err => {
                console.log(err);
            })

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }

    }
};