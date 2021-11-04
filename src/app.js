const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require('ejs')



//call express function and store in const app
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// express middleware
app.use(express.urlencoded({extended: true}))


app.use(express.static(path.join(__dirname, '/public/')));


//json data
const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

//users
const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData)


//transfer route
app.get('/transfer', (req, res) => {
    res.render('transfer')
})

//savings account route
app.get('/savings', (req, res) => {
    res.render('account', {account: accounts.savings})
})

//checking and credit routes
app.get('/checking', (req, res) => {
    res.render('account', {account: accounts.checking})
})

app.get('/credit', (req, res) => {
    res.render('account', {account: accounts.credit})
})

app.get('/profile', (req, res) => {
    res.render('profile', {user:users[0]})
})

app.get('/', (req, res)=> {
    res.render('Account Summary', {accounts: accounts})
})

app.listen(3000 , ()=> {
    console.log("PS Project Running on port 3000!")
})