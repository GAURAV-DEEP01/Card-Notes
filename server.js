const express = require("express")
const path = require("path")
const mongoose = require('mongoose')
const Card = require('./model/Card')
const User = require('./model/User')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 5000
//promise chaining for now change this later
mongoose.connect('mongodb://0.0.0.0:27017/card_dashbord')
.then(data=>{
    console.log("connected")
})
.catch(err=>{
    console.log("connection failed")
})

app.use(express.static('./src'))
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")))

// api get endpoints
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./src/index.html"))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"/src/login.html"))
})

// api post endpoints
app.post('/login',async(req,res)=>{
    const user = await User.findOne(req.body)
    if(!user)
        res.status(422).json({success:false, msg:"User doesn't exist, Please enter valid email and password"});
    else
        res.status(200).json({success:true, msg:"User found", user:{email:user.email}});
})

app.post('/signup',async(req,res)=>{
    try{
        const user = await User.create(req.body)
        res.status(200).json({success: true, user:{email:user.email} , msg:"User successfully created"})
    }
    catch(err){
        res.status(422).json({success:false, msg:"User couldn't be created"})
    }
})

// to be continued 
// app.get("/getcards",async(req,res)=>{
//     const {user} = req.body
//     res.status(200).send(data);
// })

// app.post("/creatcard",async(req,res)=>{
//     const {user} = req.body
//     res.status(200).send(data);
// })

// app.post("/deletecard",async(req,res)=>{
//     const {user} = req.body
//     res.status(200).send(data);
// })

//non-existing page yet to create
app.all("*",(req,res)=>{
    res.status(404).send("page not found")
})

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})
