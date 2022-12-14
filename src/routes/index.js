const express = require("express");
const router = express.Router();
const sessionR = require('./session.js')
const productosRoute = require('./productosRoute.js')
const carritosRoute = require('./carritosRoute.js')
const apiRoute = require('./apiRoute.js')
const {infoController} = require('../controller/apiController.js')
const compression = require('compression')
const logger = require('../config/logger.js')

router.get('/', (req,res)=>{
    logger.info(`Login de usuario`)
    res.render('login')
})

router.get('/info', compression(), infoController)

router.use(sessionR)
router.use('/productos', productosRoute)
//router.use('/carritos', carritosRoute)
router.use('/api', apiRoute)

module.exports = router;
