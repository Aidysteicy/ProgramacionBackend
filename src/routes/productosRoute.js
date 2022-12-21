const Router =require('koa-router')
const routerProductos = new Router({
    prefix: '/productos'
})

const prodController = require('../controller/prodController')
const controlador = new prodController()

routerProductos.get('/', controlador.getProd)
routerProductos.get('/:id', controlador.getProdId);
//Agregar producto
routerProductos.post('/', controlador.saveProd);
//Actualizar producto
routerProductos.put('/:id', controlador.putProd);
//Eliminar producto
routerProductos.delete('/:id', controlador.deleteProd);
/*const authMiddleware = require('../middlewares/auth.middle');
routerProductos.get("/", authMiddleware, );


*/
//**********Rutas no implementadas***********//
/*
routerProductos.get('*', (req,res)=>{
    res.redirect('/login')
})*/

module.exports = routerProductos ;