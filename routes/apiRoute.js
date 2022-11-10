const express = require("express");
const router = express.Router();
const ApiProductos = require ('../api/productos.js')
const apiProductos = new ApiProductos()
const {fork} = require('child_process')
const numCPUs= require('os').cpus().length
const logger = require('../logger.js')

router.get('/randoms', (req, res)=>{
    res.send(`Numero aleatorio en puerto ${process.argv.slice(2)}`)
})
router.get('/randoms/fork', (req,res)=>{
    try {
        const {cant} = parseInt(req.query) || 5
        const forked = fork('configFork.js')
        forked.send(cant)
        logger.info("Configuracion fork creada")
        forked.on("resp", (msg)=>{
            res.send(msg)
        })
    } catch (error) {
        logger.error(`Error en la ruta: ${error.message}`)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.get('/productos-test', async (req,res)=>{
    const data = await apiProductos.productosAleatorios()
    if(!data){
        logger.info("No se generaron productos aleatorios")
    }
    res.render('productosTest', {data})
})

router.get('*', (req, res) => {
    const { url, method } = req.query
    logger.warn(`Ruta ${url} con método ${method} no implementada`)
    res.status(404).send(`Ruta ${url} con método ${method} no implementada`)
})

process.on('message', messageSend =>{
    logger.info(messageSend)
    process.send()
})

module.exports = router
