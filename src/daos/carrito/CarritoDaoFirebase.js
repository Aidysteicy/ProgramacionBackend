import { ContenedorFirebase } from '../../contenedores/contenedorFirebase.js';

class CarritoDaoFirebase extends ContenedorFirebase{

    constructor(){
        super('carritos')
    }

}

export {CarritoDaoFirebase}