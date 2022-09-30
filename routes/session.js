const express =require('express')
const authMiddleware = require('../middlewares/auth.middle');

const router = express.Router();

router.get('/login', authMiddleware, async (req, res)=>{
    try {
        const username = req.session.username
        res.status(200).render('main',{username})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.post('/login', async (req, res)=>{
    try {
        const { username, password } = req.body
        if(username && password){
            req.session.username = username
            req.session.admin = true
            return res.status(200).render('main', {username})
        }
    return res.status(400).send(`<h1>Error Datos incorrectos</h1>`)    
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })        
    }
})

router.get('/logout', authMiddleware, async (req, res)=>{
    try {
        const username = req.session.username
        req.session.destroy(err =>{
            if(err){
                return res.status(500).send(`<h1>Error al cerrar sesion</h1>`)
            }
        })
        res.status(400).render('logout', {username})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })        
    }
})

module.exports = router