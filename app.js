const express =require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const logger = require('morgan')
const session = require('express-session')
const MongStore = require('connect-mongo');
const handlebars = require('express-handlebars')
const indexRouter = require('./routes/index.js')
const configMongo = require('./configMongo.js')
const ContenedorMongo = require('./contenedores/contenedorMongo.js')
const model = require('./models/usuarios.js')
const Users = new ContenedorMongo(model)
//const isValidPassword = require('./utils/validarPassword')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const app = express();
const flash = require('connect-flash')

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.use(flash())
app.use(logger('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: MongStore.create({mongoUrl: configMongo.cnxStr, mongoOptions: configMongo.options})
}))

app.use(passport.initialize())
app.use(passport.session())
//app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)

function isValidePassword(user, password){
    console.log(bcrypt.compareSync(password, user.password))
    return bcrypt.compareSync(password, user.password)
}

function createHash (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use('login', new LocalStrategy(
    async (username, password, done)=>{
        const user = await Users.getbyField({email: username})
        if (user=='nok' || user.length==0) {
            return done(null, false, { message: `User ${username} not found` })
        }
         if (!isValidePassword(user[0], password)) {
             return done(null, false, { message: 'Password incorrect' })
         }
       /* if (user[0].password !== password) {
            return done(null, false, { message: 'Password incorrecto' })
        }    */       
        done(null, user[0])
    }
))

passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    async (req, username, password, done)=>{
        let user = await Users.getbyField({email: username})
        if(user.length!==0){
            return done(null, false, {message: `User ${username} already exists`})
        }
        const newUser = {
            email: username,
            password: createHash(password),
        }
        const guardar = await Users.save(newUser, 'usuarios')
        if(guardar=='ok'){
            user = await Users.getbyField({email: username})
        }
        return done(null, user[0])
    }
))

passport.serializeUser((user, done) =>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done) =>{
    const user = await Users.getbyField({_id: id})
    done(null, user)
})

module.exports = app