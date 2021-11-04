const fs = require('fs');
const path = require('path');
const express = require('express');
const ejs = require('ejs')

const { accounts, users, writeJSON } = require.apply('./data.js')

const accountRoutes = require.apply('./routes/accounts.js')
const servicesRoutes = require.apply('./routes/services.js')

//call express function and store in const app
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// express middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public/')));

//account routes
app.use('/account', accountRoutes)
app.use('/services', servicesRoutes)

//index
app.get('/', (req, res)=> {
    res.render('index', {'Account Summary': accounts})
})

app.get('/profile', (req, res) => {
    res.render('profile', {user:users[0]})
})


app.listen(3000 , ()=> {
    console.log("PS Project Running on port 3000!")
})