const ApiProductos = require ('../api/productos.js')
const apiProductos = new ApiProductos()
const {fork} = require('child_process')
const numCPUs= require('os').cpus().length
const logger = require('../config/logger.js')

async function prodAleController (req,res){
    const data = await apiProductos.productosAleatorios()
    if(!data){
        logger.info("No se generaron productos aleatorios")
    }
    res.render('productosTest', {data})
}

async function rutaNoImp (req, res) {
    const { url, method } = req.query
    logger.warn(`Ruta ${url} con método ${method} no implementada`)
    res.status(404).send(`Ruta ${url} con método ${method} no implementada`)
}

async function infoController (req,res){
    try {
        const args = process.argv.slice(2)
        const path = process.cwd()
        const id = process.pid
        const version = process.version
        const so = process.platform
        const memory = process.memoryUsage().rss
        logger.info(`Mi info: ${args}, ${path}, ${id}, ${version}, ${so}, ${memory}, ${numCPUs}`)
        res.status(200).render('info', {args, path, id, version, so, memory, numCPUs})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {prodAleController, rutaNoImp, infoController}
