const path = require("path")
const express = require("express")
const app = express()
const Card = require('./model/Card')
const User = require('./model/User')
const {signIn,connectMongoDb,validatePassword} = require('./connect.js')
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//promise chaining for now change this later ("jugad")
connectMongoDb()
.then(data=> console.log("Connected"))
.catch(err=>console.error("Connection error : ",err))

// static files
app.use(express.static('./src'));
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")));

// api get endpoints
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./src/index.html"));
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"/src/login.html"));
})

// api post endpoints
// auth 
app.post('/login',async(req,res)=>{
    const exists = await validatePassword(req.body)
    if(!exists)
        res.status(422).json({success:false, msg:"User doesn't exist, Please enter valid email and password"});
    else
        res.status(200).json({success:true, msg:"User found", user:{email:req.body.email}});
})

app.post('/signup',async(req,res)=>{
    try{
        await signIn(req.body.email ,req.body.password)
        res.status(200).json({success: true, user:{email:req.body.email} , msg:"User successfully created"});
    }
    catch(err){
        console.log(err)
        res.status(422).json({success:false, msg:"User couldn't be created"});
    }
})

// card operations 
app.post("/getcards",async(req,res)=>{
    try{
        const {email} = req.body;
        const data = await Card.find({email}).select({date:1,heading:1,note:1,_id:0});
        res.status(200).json({success:true, msg:"card data sent",card:data});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false, msg:"Couldn't get card data"})
    }   
})

app.post("/createcard",async(req,res)=>{
    try{
        await Card.create(req.body);
        res.status(200).json({success:true, msg:"card created"});
    }catch(err){
        res.status(500).json({success:false, msg:"card couldn't be created"});
    }
})

app.post("/deletecard",async(req,res)=>{
    try{
        await Card.deleteOne(req.body);
        res.status(200).json({success: true,msg:"card deleted"});}
    catch(err){
        res.status(500).json({success: false,msg:"card couldnt be deleted"});
    }
})

//non-existing page 
app.all("*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"./src/pagenotfound.html"));
})

app.listen(process.env.PORT,()=>{
    console.log(`listening to ${process.env.PORT}`);
})
