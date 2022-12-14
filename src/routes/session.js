const express =require('express')
const authMiddleware = require('../middlewares/auth.middle');
const passport = require('../utils/passport')
const router = express.Router();
const sessionController = require('../controller/sessionController')
const session = new sessionController()

router.get('/home', authMiddleware, session.homeControl)
router.get('/login', authMiddleware, session.loginControl)

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

router.get('/fail', session.failControl)

router.get('/logout', session.logoutControl)

module.exports = router
