const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth');
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
router.get('/dashboard',ensureAuth, (req,res)  => {
    //res.send('Dashboard')
    res.render('dashboard')
})

module.exports = router