
const config = {
    fileSystem: {
        path: './database'
    },
    mongodb: {
        cnxStr: "mongodb://localhost:27017/ecommerce", //process.env.MONGODB_CONNECT,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // useCreateIndex: true,
            //serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "proyectocoderv2",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "5",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": ""
      },
    mariadb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            passwoerd: '',
            database: 'test'
        }
    }
}

export {config} 
