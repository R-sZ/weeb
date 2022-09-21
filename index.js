require("dotenv").config()
const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose")
const app = express()
const port = process.env.PORT || 8080
app.set('view engine', 'ejs')

//Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false
}))
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

// Database Section
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => {
    console.log(error)
})
db.once('open', () =>{
    console.log("Connection With Database Succsess")
})

//Server Section
app.use("", require('./routes/routes'))

app.listen(port, () =>{
    console.log(`Server run port http://localhost:${port}`)
})
// TODO!! 
// Edit and Delete Database Setelah PTS !!