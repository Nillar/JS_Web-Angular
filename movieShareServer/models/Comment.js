const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {type:mongoose.Schema.ObjectId, ref: 'User', required: true},
    moviePostId: {type: mongoose.Schema.ObjectId, ref: 'Post'},
    content: {type: mongoose.Schema.Types.String, required: true, min: 2, max: 250},
    creationDate: {type: mongoose.Schema.Types.Date, default: Date.now()},
    likes: {type: mongoose.Schema.Types.Number, default: 0}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;