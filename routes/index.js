const express = require('express')
const router = express.Router()

//@desc    Login/Landing page
//@route   GET /
router.get('/', (req,res)  => {
    //res.send('login')
    //res.render('Login')
    res.render('Login',{
        layout: 'login',
    })
})

//@desc    Dashboard
//@route   GET /dashboard
router.get('/dashboard', (req,res)  => {
    //res.send('Dashboard')
    res.render('dashboard')
})

module.exports = router