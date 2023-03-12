const express=require("express");
const fs=require("fs");
const path=require("path");
const app=express();
const port=80;
const mongoose=require("mongoose");
const bodyParser=require('body-Parser');
mongoose.set('strictQuery', true);//to stop deprecation warning
const mongourl="mongodb://127.0.0.1:27017/gymweb";//url
//gymweb is our database.
//inside this,Gym is the subfolder.
const gymschema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phoneno:{
        type:Number,
        require:true
    },
    mail:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }
});
var Gym=mongoose.model('Gym',gymschema);//creating a collection, gym will get converted into gyms(plural)
mongoose.connect(mongourl,{useNewUrlParser:true},(err)=>{
    if(err) console.log(`unable to connect:/ error:${err}`);
    else console.log("connection successfull:)");
})//connecting mongoose
//require("./connection")//to include our connection file i.e connecting our database

app.use(express.static(path.join(__dirname,'static')));//used to serve the CSS files which are kept in the static folder
//console.log(path.join(__dirname)); to get current dir name
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'static/web.html'));
});
app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,'static/about.html'));
});
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname,'static/contact.html'));
});
app.get("/location",(req,res)=>{
    res.sendFile(path.join(__dirname,'static/location.html'));
});
app.get("/form",(req,res)=>{
    res.sendFile(path.join(__dirname,'static/form.html'));
});
app.post("/register",async(req,res)=>{
    let userdata=new Gym(req.body);
    console.log(userdata);
    userdata.save().then(()=>{
        console.log("data saved");
    }).catch(()=>{
        res.status(404).console.log("data not saved:/")
    })
    res.sendFile(path.join(__dirname,'static/formdone.html'));
});
app.listen(port,()=>{
    console.log("app running successfully on port %d",port);
});