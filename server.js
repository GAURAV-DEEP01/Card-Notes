const express = require("express")
const path = require("path")
const app = express()
const port = 5000
const mongodbConnect = require('./connect')

app.use(express.static('./src'))
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")))

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./src/index.html"))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"/src/login.html"))
})

app.get("/user/carddata",async(req,res)=>{
    let fdata = await mongodbConnect.dbConnect()
    let result =  fdata.collection("card_data");
    let data = await result.find().toArray()
    res.status(200).send(data);
})
// app.get("/user/login",async(req,res)=>{
//     let result = await mongodbConnect.dbConnect();
//     let data = await result.find().toArray()
//     res.send(data);
// })
app.all("*",(req,res)=>{
    res.status(404).send("page not found")
})

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})
