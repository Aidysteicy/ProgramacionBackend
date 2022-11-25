const express =require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const logger = require('morgan')
const session = require('express-session')
const MongStore = require('connect-mongo');
const handlebars = require('express-handlebars')
const indexRouter = require('./src/routes/index.js')
const configMongo = require('./src/config/configMongo.js')
const passport = require('./src/utils/passport')
const app = express()
const compression = require('compression')
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
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)
app.use(compression())

module.exports = app
