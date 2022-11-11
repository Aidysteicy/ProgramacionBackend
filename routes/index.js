const express = require("express");
const router = express.Router();
const sessionR = require('./session.js')
const apiRoute = require('./apiRoute.js')
const numCPUs= require('os').cpus().length
const compression = require('compression')
const logger = require('../logger.js')


router.get('/', (req,res)=>{
    logger.info(`Login de usuario`)
    res.render('login')
})

router.get('/info', compression(), (req,res)=>{
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
})

router.get('/nuevo', async (req,res)=>{
    res.render('newProduct')
});

router.use(sessionR)
router.use('/api', apiRoute)

module.exports = router;
