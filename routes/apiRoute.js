const express = require("express");
const router = express.Router();
const ApiProductos = require ('../api/productos.js')
const apiProductos = new ApiProductos()
const {fork} = require('child_process')
const numCPUs= require('os').cpus().length

router.get('/randoms', (req, res)=>{
    res.send(`Numero aleatorio en puerto ${process.argv.slice(2)}`)
})
router.get('/randoms/fork', (req,res)=>{
    try {
        const {cant} = parseInt(req.query) || 5
        const forked = fork('configFork.js')
        forked.send(cant)
        forked.on("resp", (msg)=>{
            res.send(msg)
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.get('/productos-test', async (req,res)=>{
    const data = await apiProductos.productosAleatorios()
    res.render('productosTest', {data})
})

process.on('message', messageSend =>{
    console.log(messageSend)
    process.send()
})

module.exports = router
