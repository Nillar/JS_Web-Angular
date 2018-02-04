module.exports = {
    development: {
        port: process.env.PORT || 3001,
        dbPath: 'mongodb://localhost:27017/MovieShare'
    },
    production: {}
};