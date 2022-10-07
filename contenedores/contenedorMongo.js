const { connect } = require('mongoose')
require('dotenv').config()
const configMongo = require('../configMongo.js')

connect(configMongo.cnxStr, configMongo.options)

class ContenedorMongo {

    constructor(modelo){
        this.modelo = modelo;
    }

    async

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
            console.log(error)
            return 'nok'
        }
    }

    async saveByID(id, objeto){
        try {
            await this.modelo.updateOne({_id: id}, {$set:objeto})
            return 'ok'
        } catch (error) {
            console.log(error);
            return 'nok'
        }
    }

    async getAll(){
        try {
            const docs = await this.modelo.find()
            return docs
        } catch (error) {
            console.log(error)
        }
    }

    async getbyField(field){
        try {
            const doc = await this.modelo.findOne(field)
            return doc
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }

    async deleteById(id){
        try {
            const buscar = await this.getbyId(id)
            if(buscar.length!=0 && buscar!='nok'){
                await this.modelo.deleteOne({_id: id})
                return 'ok'
            }
            return 'nok'
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }

    async deleteAll(){
        try {
            await this.modelo.deleteMany({})
            return 'ok'
        } catch (error) {
            console.log(error);
            return 'nok'
        }
    }
    
}

module.exports= ContenedorMongo