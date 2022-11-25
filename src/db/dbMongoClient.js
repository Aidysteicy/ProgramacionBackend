const configMongo = require('../config/configMongo')
const CustomError = require('../errores/CustomError.js')
const mongoose = require('mongoose')
const DbClient = require('./DbClient.js')
const logger = require('../config/logger.js')

class MyMongoClient extends DbClient {
    constructor() {
        super()
        this.connected = false
        this.client = mongoose
    }

    async connect() {
        try {
            await this.client.connect(configMongo.cnxStr, configMongo.options)
            logger.info('base de datos conectada')
            this.connected = true
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mongodb 1', error)
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            logger.info('base de datos desconectada')
            this.connected = false
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mongodb 2', error)
        }
    }
}

module.exports = MyMongoClient
