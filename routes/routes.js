const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const multer = require('multer')


// image upload


router.get('/',(req,res)=>{
    res.render('index',{title:'Home Page'})
})

router.get('/add',(req,res)=>{
    res.render("add_users",{title:'Add Users'})
})

router.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
})

router.get('/contact',(req,res)=>{
    res.render('contact',{title:'Contact'})
})
module.exports = router;