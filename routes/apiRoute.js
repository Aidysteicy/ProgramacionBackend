const express = require("express");
const router = express.Router();
const ApiProductos = require ('../api/productos.js')
const apiProductos = new ApiProductos()
const {fork} = require('child_process')
const numCPUs= require('os').cpus().length
const logger = require('../logger.js')
/*
router.get('*', (req,res)=>{
    const { url, method } = req.query
    logger.warn(`Ruta ${url} con método ${method} no implementada`)
    res.render('login')
})*/

process.on('message', messageSend =>{
    logger.info(messageSend)
    process.send()
})

module.exports = router
