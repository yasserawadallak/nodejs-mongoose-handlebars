
// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose'); 
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')


//Configurações 
    // Session
    app.use(session({
        secret: "testandosecret",
        resave: true,
        saveUninitialized: true,
    }))
    app.use(flash()); 
    // Middleware 
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
    // Body-Parser
            app.use(express.urlencoded({extended: true}))
            app.use(express.json())
    // Mongoose
    mongoose.Promise = global.Promise; 
    mongoose.connect('mongodb://localhost/mongo2', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log('MongoDB running ok!')

    }).catch((err) => {
        console.log('MongoDB can\'t be intializeted' + err)
    })        
    // HandleBars
    app.engine('handlebars', handlebars({defaultLayout: 'main'})) 
        app.set('view engine', 'handlebars');
    // Public
    app.use(express.static('public'));

//Rotas 
    app.use('/admin', admin)
//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log('Server running')
})

