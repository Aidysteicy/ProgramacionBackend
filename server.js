const app = require('./app')
const {fork} = require('child_process')
const cluster = require('cluster')

const { json, urlencoded } = require ('express');
const twilio = require('twilio');
const logger = require('./logger');

//******************************************* */
app.use(json());
app.use(urlencoded({extended: true}));

//******************Twilio SMS****************** */

const accountSid = process.env.ACCOUNT_ASID
const authToken = process.env.AUTH_TOKEN
const client = twilio(accountSid, authToken)
;(async () => {
    try {
        const message = await client.messages.create({
        body: 'Hola soy un SMS desde Node.js!',
        from: '+',
        to: '+'
    })
        logger.info(message)
    } catch (error) {
        logger.error(error)
    }
})()


const options = {
    body: 'Hola soy un WSP desde Node.js!',
    mediaUrl: [ 'https://www.chetu.com/img/twilio/partner/twilio-logo.png' ],
    from: 'whatsapp:+19788309704',
    to: 'whatsapp:+543518081934'
 }

 ;( async () =>{
    try {
        const message = await client.messages.create(options)
        logger.info(message)
    } catch (error) {
        logger.error(error)
    }
})()

//****Configuración del puerto del servidor****//

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));
    
    
