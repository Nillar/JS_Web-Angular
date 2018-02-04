const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = config => {
    mongoose.connect(config.dbPath, {

    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;

        console.log('Database ready and listening on port 3001');
    });

    require('../models/User');

    db.on('error', reason => {
        console.log(reason);
    });
};