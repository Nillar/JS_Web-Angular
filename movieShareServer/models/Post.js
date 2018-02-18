const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: mongoose.Schema.Types.Date, required:true, default: Date.now()},
    comments: {type: mongoose.Schema.Types.Array, default:[]},
    userRating: {type: mongoose.Schema.Types.Number, min: 1, max: 10},
    title: {type: mongoose.Schema.Types.String, required: true},
    year: {type: mongoose.Schema.Types.String, required: true},
    runtime: {type: mongoose.Schema.Types.String, required: true},
    genres: {type: mongoose.Schema.Types.String, required: true},
    director: {type: mongoose.Schema.Types.String, required: true},
    actors: {type: mongoose.Schema.Types.String, required: true},
    plot: {type: mongoose.Schema.Types.String, required: true},
    country: {type: mongoose.Schema.Types.String, required: true},
    awards: {type: mongoose.Schema.Types.String},
    poster: {type: mongoose.Schema.Types.String},
    rating: {type: mongoose.Schema.Types.String, required: true},
    imdbUrl: {type: mongoose.Schema.Types.String, required: true}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;