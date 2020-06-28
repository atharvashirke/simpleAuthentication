const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

var users = []

//Routes
app.get('/', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    var user = users.find(user => user.email === req.body.email)
    if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send("Hi " + user.name)
    } else {
        res.send("Wrong password, try again.")
    }
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    users.push({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    console.log(users)
    res.redirect('/login')
})

app.listen('3000', () => {
    console.log("Server is running")
})