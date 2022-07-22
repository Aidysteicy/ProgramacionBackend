class Contenedor {

    static id = 1

    constructor(fs, ruta){
        this.fs = fs;
        this.ruta = ruta;
    }

    async save(objeto){
        let productos = await this.getAll();
        if(productos === undefined){
            productos = await this.fs.writeFile(this.ruta, JSON.stringify([{...objeto, id: Contenedor.id}], null, 2))
        }else{
            productos.forEach(() => {
            if(productos.find(prod => prod.id === Contenedor.id)){
                Contenedor.id++;
            }
            });
            await this.fs.writeFile(this.ruta, JSON.stringify([...productos, {...objeto, id: Contenedor.id}], null, 2))
        }
        console.log(Contenedor.id)
        return Contenedor.id;
    }

    async getbyId(id){
        const productos = await this.getAll();
        const prodID = productos.find(prod => prod.id === id)
        if(prodID){
            console.log(prodID);
            return prodID; 
        }
        console.log('No existe un producto con ese ID')
        return null
    }

    async getAll(){
        try {
            let productos = await this.fs.readFile(this.ruta, 'utf-8');
            let prodJson = JSON.parse(productos);
            //console.log(prodJson)
            return prodJson;
        } catch (error) {
            console.log('Archivo no Existe')
        }
    }

    async deleteById(id){
        let productos = await this.getAll();
        const prodID = productos.find(prod => prod.id === id)
        if(prodID){
            let nuevos_productos = productos.filter(prod => prod.id !== id)
            await this.fs.writeFile(this.ruta, JSON.stringify(nuevos_productos, null, 2))
        }
    }

    async deleteAll(){
        try {
            await this.fs.writeFile(this.ruta, [])
            console.log('Todos los productos fueron borrados')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor;