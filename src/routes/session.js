const express =require('express')
const authMiddleware = require('../middlewares/auth.middle');
const passport = require('../utils/passport')
const router = express.Router();
const {homeControl, loginControl, logoutControl, failControl} = require('../controller/sessionController')

router.get('/home', authMiddleware, homeControl)
router.get('/login', authMiddleware, loginControl)

router.post('/login', passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/fail',
    failureFlash: true
}))

router.post('/signup', passport.authenticate('signup',{
    successRedirect: '/login',
    failureRedirect: '/fail',
    failureFlash: true
}))

router.get('/signup', (req,res)=>{
    res.status(200).render('signup')
})

router.get('/fail', failControl)

router.get('/logout', logoutControl)

module.exports = router
