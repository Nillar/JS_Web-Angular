const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    sender: {type:mongoose.Schema.Types.String, required: true},
    recipient: {type:mongoose.Schema.Types.String, required: true},
    title: {type: mongoose.Schema.Types.String, required: true},
    text: {type: mongoose.Schema.Types.String, required: true},
    expirationDate: {type: mongoose.Schema.Types.Date, required: true},
    isRead: {type: mongoose.Schema.Types.Boolean, required: true}
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;