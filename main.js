const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config('.env')

const app = express();
const PORT = process.env.PORT || 4000;

if (!process.env.PORT) {
    console.error('PORT is not defined in the environment variables.');
    process.exit(1); // Exit the process with an error code
}




//Database connection
mongoose.connect(process.env.DB_URI)
if (!process.env.DB_URI) {
    console.error('DB_URI is not defined in the environment variables.');
    process.exit(1); // Exit the process with an error code
}
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to the DataBase!'))

//middlewares

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(
    session({
    secret: 'My secret key',
    saveUninitialized: true,
    resave: false,
}))

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(express.static("uploads"));

//set template engine 
app.set('view engine', 'ejs');


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})

app.use('',require('./routes/routes.js'),(req,res)=>{

})

// app.use('/add',require('./routes/routes.js'));
// app.use('/about',require('./routes/routes.js'));