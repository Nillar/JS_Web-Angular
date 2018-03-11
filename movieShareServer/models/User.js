const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const friends = require("mongoose-friends");

const userSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.String, required: true, unique: true},
    email: {type: mongoose.Schema.Types.String, required: true, unique: true},
    firstName: {type: mongoose.Schema.Types.String, required: true},
    lastName: {type: mongoose.Schema.Types.String, required: true},
    friendsArr: {type: mongoose.Schema.Types.Array, default: []},
    wishList: {type: mongoose.Schema.Types.Array, default: []},
    favoritesList: {type: mongoose.Schema.Types.Array, default: []},
    likedPosts: {type: mongoose.Schema.Types.Array},
    hashedPass: {type: mongoose.Schema.Types.String, required: true},
    repeatPass: {type: mongoose.Schema.Types.String, required: true},
    resetPasswordToken: {type: mongoose.Schema.Types.String},
    resetPasswordExpires: {type: mongoose.Schema.Types.Date},
    salt: {type: mongoose.Schema.Types.String, required: true},
    isAdmin: {type: mongoose.Schema.Types.Boolean, default: false},
});

userSchema.plugin(friends({pathName: "request"}));

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

// User.seedAdminUser = async () => {
//     try {
//         let users = await User.find();
//         if (users.length > 0) return;
//         const salt = encryption.generateSalt();
//         const hashedPass = encryption.generateHashedPassword(salt, 'admin');
//         const username = 'admin';
//         const repeatPass = 'admin';
//         const adminEmail = 'admin@abv.bg';
//         return User.create({
//             username,
//             adminEmail,
//             hashedPass,
//             repeatPass,
//             salt,
//             isAdmin: true
//         });
//     } catch (e) {
//         console.log(e);
//     }
// };


module.exports = User;