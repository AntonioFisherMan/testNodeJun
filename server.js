const express = require('express')
const mongoose = require("mongoose")
const router = require('./src/routes/index')
const handlebars = require('express-handlebars');
const app = new express()
const AppController = require('./src/controllers/app.controller')

let url = "https://www.olx.ua/uk/"

//customise views
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('views', './src/views')
app.set('view engine', 'handlebars')

//connect to MONGO_DB
const db = "mongodb+srv://toxa_k_9:zxcv123580@cluster0.k5f2o.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(db,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log("DB CONNECTED")).catch(err => {
    console.log(`DB CONNECTION ERR ${err.message}`)
})

//launch server
const port = 5000
app.listen(port, () => console.log(`Server started ${port}`))

AppController.requestToUrl(url)

app.use('/', router)
