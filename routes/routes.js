const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const multer = require('multer')
const fs = require('fs');

// image upload
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Absolute Path:", __dirname + "uploads");

        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
    cb(null,file.fieldname+ "_" + Date.now() + "_" + file.originalname);
    }
}) 

let upload = multer({
    storage: storage,
}).single("image");

//insert an user into database route
router.post("/add", upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename
    });
    user.save()
        .then(() => {
            req.session.message = {
                type: 'success',
                message: 'User added successfully!'
            }
            res.redirect("/")
            // 
        }).catch((err) => {
           res.json({ message: err.message, type: 'danger' });
        });

    })



//Get all users route
router.get("/", (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      res.render("index", {
        title: "Home Page",
        users: users,
      });
    })
    .catch((err) => {
      res.json({ message: err.message, type: "danger" });
    });
});

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