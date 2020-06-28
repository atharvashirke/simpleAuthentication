const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

var users = []

//Routes
app.get('/', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    users.push({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(users)
})

app.listen('3000', () => {
    console.log("Server is running")
})