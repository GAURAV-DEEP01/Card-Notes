const path = require("path")
const express = require("express")
const app = express()
const Card = require('./model/Card')
const database = require('./connect.js')
const User = require("./model/User")
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

database.connectMongoDb()
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
    try{
        const token = await database.validatePassword(req.body)
        !token? 
            res.status(422).json({success:false, msg:"User doesn't exist, Please enter valid email and password"}):
            res.status(200).json({success:true, msg:"User found", userId:token.userId,username:token.username});
    }catch{
        res.status(500).json({success:false, msg:"Couldn't validate user somthing went wrong"});
    }
})

app.post('/signup',async(req,res)=>{
    try{
        const token = await database.signIn(req.body.username,req.body.email ,req.body.password)
        res.status(200).json({success: true, userId:token.userId,username:token.username , msg:"User successfully created"});
    }
    catch(err){
        console.log(err)
        res.status(422).json({success:false, msg:"User couldn't be created"});
    }
})

// card operations 
app.post("/getcards",async(req,res)=>{
    try{
        const {userId} = req.body;
        const data = await Card.find({userId}).select({date:1,heading:1,note:1,_id:0});
        res.status(200).json({success:true, msg:"card data sent",card:data});
    }catch(err){
        console.error(err);
        res.status(500).json({success:false, msg:"Couldn't get card data"})
    }   
})

app.post("/createcard",async(req,res)=>{
    try{
        const card = new Card ({
            userId:String(req.body.userId),
            heading:String(req.body.heading),
            date:String(req.body.date),
            note:String(req.body.note)
        })
        await card.save();
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
//friends
app.post("/getuser",async(req, res)=>{
    try{
        console.log(req.body.username)
        const exists = await User.findOne({username:req.body.username});
        !exists ?
            res.status(404).json({success:false, msg:"user does not exist"}) :
            res.status(200).json({success:true,msg:"user found",username:exists.username }) ;
    }catch{
        1
    }
})
app.post("/addfriend",async(req,res)=>{
    try{
        const user = await database.addFriend(req.body.username,req.body.friend)
        !user ?
            res.status(422).json({success:false,msg:"unable to add friend"}):
            res.status(200).json({success:true,msg:"friend added succesfully",user});
    }catch(err){
        console.error("couldn't add friend : ",err)
    }
})
app.post("/loadfriends",async(req,res)=>{
    try{
        const user = await database.addFriend(req.body.username)
        !user ?
            res.status(422).json({success:false,msg:"found friends list"}):
            res.status(200).json({success:true,msg:"friends list found succesfully",friends:user});
    }catch(err){
        console.error("couldn find friends list : ",err)
    }
})

//non-existing page 
app.all("*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"./src/pagenotfound.html"));
})

app.listen(process.env.PORT,()=>{
    console.log(`listening to ${process.env.PORT}`);
})
