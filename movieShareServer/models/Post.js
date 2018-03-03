const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: mongoose.Schema.Types.Date, required: true, default: Date.now()},
    userRating: {type: mongoose.Schema.Types.Number, min: 1, max: 10},
    userReview: {type: mongoose.Schema.Types.String, minLength: 3, maxLength: 500},
    likes: {type: mongoose.Schema.Types.Number, default: 0},
    title: {type: mongoose.Schema.Types.String, required: true},
    year: {type: mongoose.Schema.Types.String, required: true},
    plot: {type: mongoose.Schema.Types.String, required: true},
    poster: {type: mongoose.Schema.Types.String}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;