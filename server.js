const express = require("express")
const path = require("path")
const app = express()

const port = 5000

app.use(express.static('./src'))
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")))

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./src/index.html"))
})
app.all("*",(req,res)=>{
    res.status(404).send("not found")
})

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})