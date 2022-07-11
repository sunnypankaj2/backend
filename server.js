if(process.env.NODE_ENV !== 'production'){
   require('dotenv').config();  // .load has been replace by .config 
}
const mongoose = require ('mongoose');

const router = require('./routes/router')

const express = require('express');

const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('view engine','ejs'); 

app.set('views',__dirname+'/views');

app.set('layout','layouts/layout');

app.use(expressLayouts);

app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error',error=>console.error(error));

db.once('open',()=>console.log("connected to mongoose"));

app.listen(process.env.PORT || 3000);

app.use(router);