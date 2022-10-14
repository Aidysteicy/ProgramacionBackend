const express = require("express");
const router = express.Router();
const sessionR = require('./session.js')
const apiRoute = require('./apiRoute.js')

router.get('/', (req,res)=>{
    res.render('login')
})

router.get('/info', (req,res)=>{
    try {
        const args = process.argv.slice(2)
        const path = process.cwd()
        const id = process.pid
        const version = process.version
        const so = process.platform
        const memory = process.memoryUsage().rss
        res.status(200).render('info', {args, path, id, version, so, memory})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.use(sessionR)
router.use('/api', apiRoute)

module.exports = router;