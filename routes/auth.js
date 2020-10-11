const express = require('express');
const passport = require('passport');
const router = express.Router();

//@description:- Authenticate with google
//@rooute :-  /auth/google
//@method :- GET

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//@description:- google auth callback
//@rooute :-  /auth/google/callback
//@method :- GET

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
	res.redirect('/dashboard');
});
//so if the authentication is successfull then it will take us to the dashboard, if not it will redirect to the main page

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});
module.exports = router;