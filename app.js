const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const db = require("./config/mongoose-connection")
const path= require('path');
const multer = require('multer');
const flash = require('connect-flash');
const expressSession = require('express-session');
require('dotenv').config();//jo bhi envfile me data hei use use kar payenge like jwt keys 😊 ye dusara tarika hei pahela tarika hei devlopment environment variable set karke jo / config/monngoose-connection.js me use kiya tha
//environment ⬆ variable

const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use(expressSession({
    resave:false,//bar bar save mat karo agar change nahi ho raha ho to
    saveUninitialized:false,// koi newUser aata hei to usaka session create mat karna
    secret: process.env.EXPRESS_SESSION_SECRET, 
}))
app.use(flash())//rout change hone par bhi data access kar sakate hei 


const ownersRouter= require('./routes/ownersRouter');//jisme sirf owner ke rout hoge
const usersRouter= require('./routes/usersRouter');//jisme sirf user ke rout hoge
const productsRouter= require('./routes/productsRouter');//jisme sirf product ke rout hoge
const indexRouter = require('./routes/index');

app.use("/", indexRouter)
app.use("/owners", ownersRouter)// "/owners"se raletive sari reaquest ownersRouter router par bhejo 
app.use("/users", usersRouter)// "/users"se raletive sari reaquest usersRouter router par bhejo
app.use("/products", productsRouter) // "/product"se raletive sari reaquest productsRouter router par bhejo


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
