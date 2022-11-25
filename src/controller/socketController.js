const {Server: ServerIo} = require('socket.io')
const {httpServer} = require('../../server.js')
const io = new ServerIo(httpServer)
const misocket = require('../services/socketIO.js')

try {
    io.on('connection', misocket())
} catch (error) {
    console.log(error)
}

module.exports = io
