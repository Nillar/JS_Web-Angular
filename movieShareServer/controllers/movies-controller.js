const encryption = require('../util/encryption');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const User = require('mongoose').model('User');
const Notification = require('mongoose').model('Notification');
const Post = require('mongoose').model('Post');
const passport = require('passport');
const authValidation = require('./../util/authValidation');
const friends = require('mongoose-friends');
// const userController = require('./user-controller');
const authCheck = require('../middleware/auth-check');
const jwt = require('jsonwebtoken');
const imdb = require('imdb-api');
const jquery = require('jquery');

module.exports = {
    searchMovie: async (req, res) => {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        let token = req.headers.authorization.split(' ')[1];
        try{

            let decoded = await jwt.verify(token, process.env.SECRET_STRING);

            let searchTitle = req.body.title.trim();

            imdb.getReq({ name: searchTitle, opts: {apiKey: process.env.API_KEY, timeout: 3000} }).then(data=>{
                let movie = {
                    title: data.title,
                    year: data.year,
                    runtime: data.runtime,
                    genres: data.genres,
                    director: data.director,
                    actors: data.actors,
                    plot: data.plot,
                    country: data.country,
                    awards: data.awards,
                    poster: data.poster,
                    rating: data.rating,
                    imdbUrl: data.imdburl
                };
                return res.json({
                    success: true,
                    message: 'Movie found ' + movie.title,
                    movie: movie
                });

            }).catch(error => {
                return res.json({
                    success: false,
                    message: error.message
                })
            });

        }catch (err){
            return res.json({
                success: false,
                message: err.message
            })
        }
    },
    createPost: async (req, res)=>{
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            }).end()
        }

        console.log(req.user);
        // User.find({username: req.user})

        let token = req.headers.authorization.split(' ')[1];
        try{
            let decoded = await jwt.verify(token, process.env.SECRET_STRING);
            let userId = decoded.sub;



            Post.create({
                creator: userId,
                date: Date.now(),
                comments: [],
                title: req.body.title,
                year: req.body.year,
                runtime: req.body.runtime,
                genres: req.body.genres,
                director: req.body.director,
                actors: req.body.actors,
                plot: req.body.plot,
                country: req.body.country,
                awards: req.body.awards,
                poster: req.body.poster,
                rating: req.body.rating,
                imdbUrl: req.body.imdbUrl
            }).then(()=>{
                return res.status(201).json({
                    success: true,
                    message: 'Post created successfully'
                })
            }).catch(err=>{
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Movie creation was unsuccessful'
                })
            });

        } catch (err){
            return res.json({
                success: false,
                message: err.message
            })
        }
    }
};