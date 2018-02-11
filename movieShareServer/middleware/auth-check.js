const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

module.exports = async (req, res, next) =>  {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-p hrase
    return jwt.verify(token, process.env.SECRET_STRING, async (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).end();
        }

        req.user = user;

        return next();
    });
};