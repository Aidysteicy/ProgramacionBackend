const ProductosDao = require('./productosDao.js')
const productos = require('../models/productos.js')
const CustomError = require('../errores/customError')
const MyMongoClient = require('../db/dbMongoClient')

class ProductosDaoDb extends ProductosDao {

    constructor(modelo) {
        super()
        this.client = new MyMongoClient()
        this.client.connect()
        this.modelo = modelo;
    }

    async save(objeto, nombre){
        try {
            const data = await this.getAll()
            if(data){
                await new this.modelo(objeto).save()
            }else{
                await this.modelo.createCollection(nombre)
                await new this.modelo(objeto).save()
            }
            return 'ok'
        } catch (error) {
            throw new CustomError(500, 'error al crear un nuevo producto', error)
        }
    }

    async saveByID(id, objeto){
        try {
            await this.modelo.updateOne({_id: id}, {$set:objeto})
            return 'ok'
        } catch (error) {
            throw new CustomError(404, 'producto no encontrado con ese ID', { id: id })
        }
       
    }

    async getAll(){
        try {
            const docs = await this.modelo.find()
            return docs
        } catch (error) {
            throw new CustomError(500, 'error al obtener todos los productos', error)
        }
    }

    async getbyField(field){
        try {
            const doc = await this.modelo.find(field)
            return doc
        } catch (error) {
            throw new CustomError(500, 'error al obtener producto', error)
        }
    }

    async deleteById(id){
        try {
            const buscar = await this.getbyId(id)
            if(buscar.length!=0 && buscar=='ok'){
                await this.modelo.deleteOne({_id: id})
                return 'ok'
            }
            throw new CustomError(500, `error al borrar producto`, error)
        } catch (error) {
            throw new CustomError(404, `no existe un producto para borrar con id: ${id}`, {id})
        }
    }

    async deleteAll(){
        try {
            await this.modelo.deleteMany({})
            return 'ok'
        } catch (error) {
            throw new CustomError(500, `error al borrar a todos los productos`, error)
        }
    }

    exit() {
        this.client.disconnect()
    }
}

module.exports= ProductosDaoDb
