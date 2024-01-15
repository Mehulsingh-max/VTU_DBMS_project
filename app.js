const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var ejs = require('ejs');
var bodyparser = require('body-parser');


dotenv.config({ path: './.env'})
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database :process.env.DATABASE
}
)
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory))

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}))

const viewspath = path.join(__dirname,"./views");

app.set('views',viewspath);
app.set('view engine','hbs');
app.set('view engine','ejs');

db.connect((error) => {
    if(error){
    console.log(error);
    }
    else{
     console.log("MYSQL connected.....");
    }
})

// app.get("/",(req,res) => {
//     res.render('index')
// });

// app.get("/register",(req,res) => {
//     res.render('register')
// });
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("server running on port 5000");
});

