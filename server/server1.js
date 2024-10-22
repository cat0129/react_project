const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(bodyParser.json());

app.use("/user", require("./route/userRoute"));
app.use("/feed", require("./route/feedRoute"));

app.listen(3100, ()=>{
    console.log("server start!");
})