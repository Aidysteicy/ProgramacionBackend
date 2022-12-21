const multer = require("multer");
const storage = multer({ destination: "/upload" });
const logger = require('../config/logger.js')
const ProductosDao = require('../daos/productosDaoDB.js')
const model = require('../models/productos')
const contenedor = new ProductosDao(model)

class prodController {

    async getProd (ctx) {
        const productos = await contenedor.getAll()
        let flag
        productos===undefined || productos.length===0 ? flag=false : flag=true
       // ctx.render("main", {isRender: flag, productos: productos});
       ctx.body={
        status: 'success',
        productos}
    }
    async getProdId(ctx){
        const id = ctx.params.id
        const prod = await contenedor.getbyId(id);
            //res.render('main', {isRender: true, productos: prod})
        ctx.body = prod
    }
    async saveProd (ctx){
        const admin = true
        if(admin){
            const producto = ctx.request.body
            console.log(producto)
            const status = await contenedor.save(producto, 'productos')
            if(status=='ok'){
                console.log('Producto Guardado') 
             }else{
                logger.error('Error al añadir producto')
             }
        }else{
            logger.error({error: -1, descripcion: 'Ruta /api/productos metodo POST no autorizada'})
        }
        ctx.body={
            message: 'producto agregado',
            producto: ctx.request.body
        }
    }
    async putProd (ctx){
        const admin = true
        if(admin){
           const id=req.params.id
            const prod = req.request.body
            const mod = await contenedor.saveByID(id, prod)
            if(mod.length!=0 && mod!='nok'){
                ctx.body={message: 'Producto Actualizado'} 
             }else{
                ctx.body={message: 'No existe un producto con ese ID'}
             }
        }else{
            logger.error({error: -1, descripcion: 'Ruta /api/productos/:id metodo PUT no autorizada'})
            ctx.redirect('/productos')
        }
    }
    async deleteProd(ctx){
        const admin = true
        if(admin){
            const id=ctx.params.id
            const prod = await contenedor.deleteById(id)
            if(prod.length!=0 && prod!='nok'){
                ctx.body={message: 'Producto Eliminado'}
             }else{
                ctx.body={message: 'No existe un producto con ese ID'}
             }
        }else{
            logger.error({error: -1, descripcion: 'Ruta /api/productos/:id metodo DELETE no autorizada'})
            //ctx.redirect('/')
        }
    }
}

module.exports = prodController