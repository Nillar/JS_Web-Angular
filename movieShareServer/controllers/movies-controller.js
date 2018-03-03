const encryption = require('../util/encryption');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const User = require('mongoose').model('User');
const Notification = require('mongoose').model('Notification');
const Post = require('mongoose').model('Post');
const Comment = require('mongoose').model('Comment');
const passport = require('passport');
const authValidation = require('./../util/authValidation');
const friends = require('mongoose-friends');
// const userController = require('./user-controller');
const authCheck = require('../middleware/auth-check');
const jwt = require('jsonwebtoken');
const imdb = require('imdb-api');
const jquery = require('jquery');
const http = require("https");

module.exports = {
    searchMovie: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];
        try {

            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            let searchTitle = req.body.title.trim();
            let pattern = /\s+/g;
            let resultTitle = searchTitle.replace(pattern, '%20');


            let options = {
                "method": "GET",
                "hostname": "api.themoviedb.org",
                "port": null,
                "path": `/3/search/movie?query=${resultTitle}&language=en-US&api_key=${process.env.TMBD_API_KEY}`,
                "headers": {}
            };

            let request = http.request(options, function (response) {
                let chunks = [];

                response.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                //https://image.tmdb.org/t/p/w185/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg
                //w185, original, w500 and other sizes of the poster
                //https://api.themoviedb.org/3/movie/27205/credits?api_key=...  27205 = movie id

                response.on("end", function () {
                    let body = Buffer.concat(chunks);

                    let movieToObj = JSON.parse(body.toString());
                    let moviesArr = [];

                    for (let obj of movieToObj.results) {
                        let movieEntry = {
                            id: obj.id,
                            title: obj.title,
                            poster: `https://image.tmdb.org/t/p/original${obj.poster_path}`,
                            plot: obj.overview,
                            year: obj.release_date
                        };

                        moviesArr.push(movieEntry);
                    }
                    return res.status(200).json({
                        success: true,
                        movies: moviesArr
                    })
                });


            });

            request.write("{}");
            request.end();


            // imdb.getReq({ name: searchTitle, opts: {apiKey: process.env.API_KEY, timeout: 3000} }).then(data=>{
            //     let movie = {
            //         title: data.title,
            //         year: data.year,
            //         runtime: data.runtime,
            //         genres: data.genres,
            //         director: data.director,
            //         actors: data.actors,
            //         plot: data.plot,
            //         country: data.country,
            //         awards: data.awards,
            //         poster: data.poster,
            //         rating: data.rating,
            //         imdbUrl: data.imdburl
            //     };
            //     return res.json({
            //         success: true,
            //         message: 'Movie found ' + movie.title,
            //         movie: movie
            //     });
            //
            // }).catch(error => {
            //     return res.json({
            //         success: false,
            //         message: error.message
            //     })
            // });

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    },
    createPost: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        console.log(req.user);
        // User.find({username: req.user})

        let token = req.headers.authorization.split(' ')[1];
        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);
            let userId = decoded.sub;


            Post.create({
                creator: userId,
                date: Date.now(),
                title: req.body.title,
                year: req.body.year,
                plot: req.body.plot,
                poster: req.body.poster,
                userReview: req.body.userReview,
                userRating: req.body.userRating
            }).then(() => {
                return res.status(201).json({
                    success: true,
                    message: 'Post created successfully'
                })
            }).catch(err => {
                return res.json({
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
    deletePost: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);


            await Post.find({_id: req.body.postId}).then(data => {
                if (data[0].author.toString() !== decoded.sub.toString()) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized!'
                    });
                }

                Comment.remove({moviePostId: req.body.postId}).then(() => {
                    return res.json({
                        success: true,
                        message: 'Post and comments removed'
                    })
                }).catch(err => {
                    return res.json({
                        success: false,
                        message: err.message
                    })
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
    getEditPost: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            Post.find({_id: req.body.postId}).then(data => {
                return res.json({
                    success: true,
                    post: data
                });
            }).catch(err=>{
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
    editPost: async (req, res)=>{
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            Post.findByIdAndUpdate({_id: req.params.postId}).then(data => {
                data.userRating = req.body.userRating;
                data.userReview = req.body.userReview;
                data.save();

                return res.json({
                    success: true,
                    message: 'Post edited successfully',
                    post: data
                });
            }).catch(err=>{
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
    getPostDetails: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let postId = req.params.postId;
        console.log(postId);

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);
            let commentsArr = [];
            let postObj = {};

            await Comment.find({moviePostId: postId}).then(data => {
                for (let obj of data) {
                    commentsArr.push(obj);
                }
            });

            await Post.find({_id: postId}).then(data => {
                postObj = data;
            });
            return res.json({
                success: true,
                post: postObj,
                comments: commentsArr
            })

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }

    },
    getMovieDetails: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let movieId = req.params.movieId;

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);
            console.log(decoded.sub);

            let options = {
                "method": "GET",
                "hostname": "api.themoviedb.org",
                "port": null,
                "path": `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMBD_API_KEY}&language=en-US`,
                "headers": {}
            };

            let request = http.request(options, function (response) {
                let chunks = [];

                response.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                //https://image.tmdb.org/t/p/w185/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg
                //w185, original, w500 and other sizes of the poster
                //https://api.themoviedb.org/3/movie/27205/credits?api_key=...  27205 = movie id

                response.on("end", function () {
                    let body = Buffer.concat(chunks);

                    return res.status(200).json({
                        success: true,
                        movies: JSON.parse(body.toString())
                    })
                });
            });

            request.write("{}");
            request.end();

        } catch (err) {
            return res.json({
                success: false,
                message: err.message
            })
        }
    },
    postComment: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            let userId = decoded.sub;
            let movieId = req.body.movieId;
            let content = req.body.content;

            Comment.create({
                author: userId,
                moviePostId: movieId,
                content: content
            }).then(data => {
                return res.status(201).json({
                    success: true,
                    message: 'Comment created successfully'
                })
            }).catch(err => {
                return res.json({
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
    deleteComment: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);


            Comment.find({_id: req.params.commentId}).then(data => {
                if (data[0].author.toString() !== decoded.sub.toString()) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized!'
                    });
                }

                Comment.findByIdAndRemove({_id: req.params.commentId}).then((data2) => {
                    return res.status(200).json({
                        success: true,
                        message: 'Comment deleted.'
                    })
                }).catch(err => {
                    return res.json({
                        success: false,
                        message: err.message
                    })
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
    likePost: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];

        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            await User.findOne({username: req.body.username}).then(data => {
                if (!data.likedPosts.join(',').includes(req.body.postId)) {
                    Post.findByIdAndUpdate({_id: req.body.postId}).then(data2 => {
                        data.likedPosts.push(req.body.postId);
                        data2.likes = Number(++data2.likes);
                        data.save();
                        data2.save();

                        return res.json({
                            success: true,
                            post: req.body.postId,
                            user: req.body.username
                        })
                    });


                }
                else if (data.likedPosts.join(',').includes(req.body.postId)) {
                    return res.json({
                        success: false,
                        message: 'You already liked this post!'
                    })

                }
            }).catch(err => {
                return res.json({
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
    getPostsByUsername: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];
        let decoded = await jwt.verify(token, process.env.SECRET_STRING);


        try {
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            let postsArr = [];
            let userId = '';

            await User.find({username: req.params.username}).then(user => {
                userId = user[0]._id;
            }).catch(err => {
                return res.json({
                    success: false,
                    message: err.message
                })
            });

            await Post.find({creator: userId}).then(data => {
                for (let obj of data) {
                    postsArr.push(obj)
                }

                return res.json({
                    success: true,
                    posts: postsArr
                })
            }).catch(err => {
                return res.json({
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
    }
};