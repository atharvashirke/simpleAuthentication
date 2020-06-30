const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

var mongoose = require("mongoose")
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

var User = mongoose.model("User", userSchema)

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
    User.find({ email : req.body.email }, 'password name', (err, user) => {
        if (err) {
            console.log("Login error")
        } else {
            if (bcrypt.compareSync(req.body.password, user[0].password)) {
                res.render('welcome', {name: user[0].name})
            } else {
                res.send("Wrong password, try again.")
            }
        }
    })
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    User.countDocuments({email: req.body.email}, (err, count) => {
        if(count > 0) {
            console.log("You already have an account with us")
            res.redirect('/login')
        } else {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }, (err, User) => {
                if(err) {
                    console.log("Something went wrong")
                } else {
                    console.log(User)
                }
                res.redirect('/login')
            })
        }
    })
})

app.listen(process.env.PORT, process.env.ADDRESS, () => {
    console.log("Server is running")
})