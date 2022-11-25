const express = require("express");
const router = express.Router();
const logger = require('../config/logger.js')
const { prodAleController, randomFork, rutaNoImp } = require('../controller/apiController.js')

router.get('/randoms/fork', randomFork)
router.get('/productos-test', prodAleController)
router.get('*', rutaNoImp)

process.on('message', messageSend =>{
    logger.info(messageSend)
    process.send()
})

module.exports = router
