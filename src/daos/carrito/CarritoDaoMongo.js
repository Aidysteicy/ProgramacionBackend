import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Carrito from '../../models/carrito.model.js';

class CarritoDaoMongo extends ContenedorMongo{

    constructor(){
        super(Carrito)
    }

    async deleteProdById(idcar, idpro){
        try {
            let validacion = false
            const buscarC = await this.getbyId(idcar)
            if(buscarC.length!=0 && buscar!='nok'){
                const products = buscarC.productos
                products.forEach(element => {
                    if(element._id==idpro){
                        validacion = true
                    }
                });
                if(validacion){
                    const nuevos_productos = products.filter(pro => pro.id !== idpro)
                    await this.modelo.updateOne({_id: idcar}, {$set: {productos: nuevos_productos}})
                    return 'ok'
                }
            }
            return 'nok'
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }
}

export {CarritoDaoMongo}