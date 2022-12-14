const express =require('express')
const routerProductos = express.Router();
const authMiddleware = require('../middlewares/auth.middle');

const prodController = require('../controller/prodController')
const controlador = new prodController()

//Variable booleana que controla si el usuario es administrador
const admin = true

routerProductos.get("/", authMiddleware, controlador.getProd);

routerProductos.get('/:id', authMiddleware, controlador.getProdId);
//Agregar producto
routerProductos.post('/', authMiddleware, controlador.saveProd);
//Actualizar producto
routerProductos.put('/:id', authMiddleware, controlador.putProd);
//Eliminar producto
routerProductos.delete('/:id', authMiddleware, controlador.deleteProd);

//**********Rutas no implementadas***********//

routerProductos.get('*', (req,res)=>{
    res.redirect('/login')
})

module.exports = routerProductos ;