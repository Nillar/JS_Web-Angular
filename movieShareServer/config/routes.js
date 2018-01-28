const controllers = require('../controllers');

module.exports = app => {
    app.post('/register', controllers.user.registerPost);
    app.post('/login', controllers.user.loginPost);
    app.get('/getUser/:id', controllers.user.getCurrentUser);
    app.post('/forgot', controllers.user.forgottenPassword);
    app.post('/reset', controllers.user.resetPassword);
    // app.post('/logout', controllers.user.logoutPost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
