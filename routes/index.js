const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Story = require('../models/Story')
//@desc    Login/Landing page
//@route   GET /
router.get('/',ensureGuest, (req,res)  => {
    //res.send('login')
    //res.render('Login')
    res.render('Login',{
        layout: 'login',
    })
})

//@desc    Dashboard
//@route   GET /dashboard
router.get('/dashboard',ensureAuth, async (req,res)  => {
    //res.send('Dashboard')
    try {
        const stories= await Story.find({ user: req.user.id}).lean()
		//in order to pass the values taken from NOSQL database to templates like hanflebar we have to convert the data into js object for that we use lean
		console.log(req.user);
		res.render('dashboard',{
		name: req.user.firstName,
        stories
    })
    } catch (err) {
        console.log(err)
        res.render('/error/500')
    }
  
})

module.exports = router