const controllers = require('../controllers');

module.exports = app => {
    app.post('/register', controllers.user.registerPost);
    app.post('/login', controllers.user.loginPost);
    app.get('/logout', controllers.user.logoutGet);

    app.get('/getUser/:id', controllers.user.getCurrentUser);
    app.get('/getUsername/:username', controllers.user.getCurrentUserByUsername);
    app.post('/forgot', controllers.user.forgottenPassword);
    app.post('/reset', controllers.user.resetPassword);

    app.post('/search/user', controllers.friends.searchForUserByUsername);
    app.post('/request', controllers.friends.sendFriendRequest);
    app.post('/accept', controllers.friends.acceptFriendRequest);
    app.post('/remove', controllers.friends.removeFriend);

    app.get('/friends/:username', controllers.friends.getAllFriends);
    app.post('/notifications', controllers.friends.getNotificationsByUsername);
    app.get('/notifications/:id', controllers.friends.markNotificationAsRead);

    app.post('/search', controllers.movies.searchMovie);
    app.post('/createPost', controllers.movies.createPost);
    app.delete('/deletePost', controllers.movies.deletePost);
    app.get('/editPost', controllers.movies.getEditPost);
    app.put('/editPost/:postId', controllers.movies.editPost);
    app.get('/details/:movieId', controllers.movies.getMovieDetails);
    app.get('/credits/:movieId', controllers.movies.getMovieCredits);
    app.get('/postDetails/:postId', controllers.movies.getPostDetails);
    app.post('/likePost', controllers.movies.likePost);

    app.post('/createComment', controllers.movies.postComment);
    app.delete('/delete/:commentId', controllers.movies.deleteComment);

    app.get('/:username/posts', controllers.movies.getPostsByUsername);
    app.get('/feed', controllers.movies.getFeed);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
