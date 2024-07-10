const express=require('express');
const app=express();

const {PORT}=require('./config/serverConfig');
const bodyParser=require('body-parser');

const {connect}=require('./config/database');
const apiRoutes = require("./routes/index");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use("/api", apiRoutes);

app.listen(PORT,async ()=>{
    console.log(`Server Started at PORT ${PORT}`);
        await connect();


});