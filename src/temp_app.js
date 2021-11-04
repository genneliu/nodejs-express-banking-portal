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

//index
app.get('/', (req, res)=> {
    res.render('index', {Account Summary: accounts})
})

//transfer route
app.get('/transfer', (req, res) => {
    res.render('transfer')
})

//post transfer
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance -= req.body.amount;
    accounts[req.body.to].balance += parseInt(req.body.amount, 10);
    writeJSON();
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'),accountsJSON, 'utf-8')
    res.render('transfer', {message: 'Transfer Completed'})
})

//get post add payment
app.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit})
})

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    const accountsJSON = JSON.stringify(accounts, null, 4)
    res.render('payment', {message: "Payment Successful", account: accounts.credit})
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


app.listen(3000);