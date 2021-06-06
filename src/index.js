'use strict'
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/routes'));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://LaraSolano:LaraSolano@proyecto-final.rt5ru.mongodb.net/Proyecto-Final?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('[ DATABASE RUNNING CORRECTLY ]')
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'),()=>{
        console.log(`[ THE SERVER IS RUNNING IN THE PORT: '${app.get('port')}' ]`);
    })
}).catch(err => console.log(err));