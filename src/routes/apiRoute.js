const express = require("express");
const router = express.Router();
const logger = require('../config/logger.js')
const { prodAleController, rutaNoImp } = require('../controller/apiController.js')

router.get('/productos-test', prodAleController)
router.get('*', rutaNoImp)

process.on('message', messageSend =>{
    logger.info(messageSend)
    process.send()
})

module.exports = router
