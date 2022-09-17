const fs = require('fs').promises;

class ContenedorCarrito {

    constructor( ruta){
        this.ruta = ruta;
        this.fs = fs;
    }

    async create(objeto){
        let id = 1
        try {
            let carritos = await this.getAll();
            if(carritos === undefined){
                carritos = await this.fs.writeFile(this.ruta, JSON.stringify([{id: id, timestamp: Date.now(), productos: [{id: 1, timestamp: Date.now(), ...objeto}]}], null, 2))
            }else{
                carritos.forEach(() => {
                    if(carritos.find(prod => prod.id === id)){
                        id++;
                    }
                });
            await this.fs.writeFile(this.ruta, JSON.stringify([...carritos, {id: id, timestamp: Date.now(), productos: [{id: 1, timestamp: Date.now(), ...objeto}]}], null, 2))
            }
        return id;
        } catch (error) {
            console.log(error);
        }
    }

    async save(idCar, objeto){
        let id = 1
        try {
            let nuevo_carrito
            let carritos = await this.getAll();
            if(carritos === undefined){
                carritos = await this.fs.writeFile(this.ruta, JSON.stringify([{id: idCar, timestamp: Date.now(), productos: [{id: 1, timestamp: Date.now(), ...objeto}]}], null, 2))
            }else{
                carritos.forEach(elem =>{
                    if(elem.id===idCar){
                        const prod = elem.productos
                        prod.forEach(producto=>{
                            if(id<producto.id){
                                id=producto.id
                            }
                        })
                        id++
                        nuevo_carrito = {id: idCar, timestamp: Date.now(), productos: [...prod, {id: id, timestamp: Date.now(), ...objeto}]}
                    }
                })
                if(nuevo_carrito!= null){
                    await this.deleteById(idCar)
                    const mod = await this.getAll()
                    await this.fs.writeFile(this.ruta, JSON.stringify([...mod, nuevo_carrito], null, 2))
                }else{
                    carritos = await this.fs.writeFile(this.ruta, JSON.stringify([{id: idCar, timestamp: Date.now(), productos: [{id: 1, timestamp: Date.now(), ...objeto}]}], null, 2))
                }
            }
            return id
        } catch (error) {
            console.log(error);
        }
    }

    async saveByID(id, productos){
        try {
            let carritos = await this.getAll();
            const carrID = carritos.findIndex(prod => prod.id === id)
            if(carrID!==-1){
                carritos[carrID]={id: id, timestamp: Date.now(), productos: productos}
                await this.fs.writeFile(this.ruta, JSON.stringify(carritos, null, 2))
                return {msg: 'Carrito Modificado'}
            }else{
                return {error: 'Carrito no encontrado'}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getbyId(idCar){
        try {
            let micarrito
            const carritos = await this.getAll();
            if(carritos === undefined){
                return {msg: 'Archivo no existe'}
            }else{
                carritos.forEach(elem => {
                    if(elem.id===idCar){
                        micarrito = elem
                    }
                })
                if(micarrito){
                    return micarrito
                }else{
                    return {error: 'No existe un carrito con ese ID'} 
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            const carritos = await this.fs.readFile(this.ruta, 'utf-8');
            const prodJson = JSON.parse(carritos);
            return prodJson;
        } catch (error) {
            console.log('Archivo no Existe')
        }
    }

    async deleteById(id){
        try {
            const carritos = await this.getAll();
            const carrID = carritos.find(prod => prod.id === id)
            if(carrID){
                const nuevos_carritos = carritos.filter(prod => prod.id !== id)
                await this.fs.writeFile(this.ruta, JSON.stringify(nuevos_carritos, null, 2))
                return {msg: 'Carrito eliminado'}
            }else{
                return {error: 'Carrito no encontrado'}
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProdById(idCar, idPro){
        try {
            let nuevo_carrito, resp
            const carritos = await this.getAll();
            carritos.forEach(elem =>{
                if(elem.id===idCar){
                    const prod = elem.productos
                    const prodID = prod.find(producto => producto.id === idPro)
                    if(prodID){
                        const nuevos_productos = prod.filter(pro => pro.id !== idPro)
                        nuevo_carrito = {id: idCar, timestamp: Date.now(), productos: nuevos_productos}
                    }else{
                        resp = true
                    }
                }
            })
            if(nuevo_carrito!= null){
                await this.deleteById(idCar)
                const mod = await this.getAll()
                await this.fs.writeFile(this.ruta, JSON.stringify([...mod, nuevo_carrito], null, 2))
                return {msg: 'Producto eliminado'}
            }else{
                if(resp){
                    return {error: 'Id del producto no encontrado'}
                }
                return {error: 'Carrito no encontrado'}
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await this.fs.writeFile(this.ruta, [])
            console.log('Todos los carritos fueron borrados')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorCarrito;