const express =require('express')
const authMiddleware = require('../middlewares/auth.middle');
const passport = require('passport')
const logger = require('../logger.js')
const router = express.Router();

router.get('/home', authMiddleware, (req,res)=>{
    try {
        const username = req.user
        logger.info(`usuario ${username} autenticado`)
        res.status(200).render('main',{user: username})
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/login', authMiddleware, (req, res)=>{
    try {
        res.status(200).redirect('/home')
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

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

router.get('/fail', (req,res)=>{
    let error_message = req.flash('error')[0]
    logger.warn(error_message)
    res.status(200).render('fail', {error_message})
})

router.get('/logout', (req, res, next)=>{
    const username = req.user
    req.logout((err)=>{
         if(err) { 
             logger.error(err)
             return next(err)
         }  
         res.render('logout', {user: username}) 
    })
})

router.get('*', (req, res) => {
    const { url, method } = req.query
    logger.warn(`Ruta ${url} con método ${method} no implementada`)
    res.status(404).send(`Ruta ${url} con método ${method} no implementada`)
})

module.exports = router
