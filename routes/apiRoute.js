const express = require("express");
const router = express.Router();
const ApiProductos = require ('../api/productos.js')
const apiProductos = new ApiProductos()
const {fork} = require('child_process')
const cluster = require('cluster')
const numCPUs= require('os').cpus().length
/*
router.get('/randoms', (req, res)=>{
    if(cluster.isPrimary){
        console.log(`Master ${process.pid} is running`)
        for(let i=0; i<numCPUs; i++){
            cluster.fork()
        }
        cluster.on('exit',(worker, code, signal)=>{
            console.log(`Worker ${worker.process.pid} died`)
        }
    }
})*/
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
/*
router.get('/randoms/cluster', (req,res)=>{
    if(cluster.isPrimary){
        console.log(`Master ${process.pid} is running`)
        for(let i=0; i<numCPUs; i++){
            cluster.fork()
        }
        cluster.on('exit',(worker, code, signal)=>{
            console.log(`Worker ${worker.process.pid} died`)
        }
    }
})*/
router.get('/productos-test', async (req,res)=>{
    const data = await apiProductos.productosAleatorios()
    res.render('productosTest', {data})
})

process.on('message', messageSend =>{
    console.log(messageSend)
    process.send()
})

module.exports = router