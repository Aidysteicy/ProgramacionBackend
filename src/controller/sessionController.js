const logger = require('../config/logger.js')
const ProductosDao = require('../daos/productosDaoDB.js')
const model = require('../models/productos')
const contenedor = new ProductosDao(model)

class sessionController{

    async homeControl (req,res){
        try {
            const username = req.user
            logger.info(`usuario ${username} autenticado`)
            const productos = await contenedor.getAll()
            let flag
            productos===undefined || productos.length===0 ? flag=false : flag=true
            res.status(200).render('main',{user: username, isRender: flag, productos: productos})
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    
    async loginControl (req, res){
        try {
            res.status(200).redirect('/home')
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    
    async logoutControl (req, res, next){
        const username = req.user
        req.logout((err)=>{
             if(err) { 
                 logger.error(err)
                 return next(err)
             }  
             res.render('logout', {user: username}) 
        })
    }
    
    async failControl (req,res){
        let error_message = req.flash('error')[0]
        logger.warn(error_message)
        res.status(200).render('fail', {error_message})
    }

}

module.exports = sessionController

