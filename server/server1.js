const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')
const app = express()
const path = require('path'); // path 모듈 import


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(bodyParser.json());

app.use("/user", require("./route/userRoute"));
app.use("/feed", require("./route/feedRoute"));
app.use('/img', express.static(path.join(__dirname, 'img'))); 
app.use('/profileImg', express.static(path.join(__dirname, 'profileImg')));


app.listen(3100, ()=>{
    console.log("server start!");
})