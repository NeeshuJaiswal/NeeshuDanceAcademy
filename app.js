
const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const port=8000;
const mongoose = require('mongoose');
const bodyparser= require('body-parser');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});

// define mongoose Schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    danceName: String

  });

  const contact = mongoose.model('Contact', contactSchema);

// Express specific stuff
app.use('/static',express.static('static'));//for serving static file
app.use(express.urlencoded());

//Pug specific stuff
app.set('view-engine','pug')//set the tamplate engine as pug

app.set('views',path.join(__dirname,'views'))//set the views directory

// Endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
});
app.get('/about',(req,res)=>{
    const params={}
    res.status(200).render('about.pug',params);
});
app.get('/services',(req,res)=>{
    const params={}
    res.status(200).render('services.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>
    {
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
});

//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});


