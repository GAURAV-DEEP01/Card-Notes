const mongoose = require('mongoose');
const demoData = require("./demo-card-data/demoData");
const User = require('./model/User')
const Card = require('./model/Card')
const bcrypt = require('bcryptjs')
require('dotenv').config();

async function signIn(userEmail, userPassword) {
    const user = new User({
        email: userEmail,
        password: userPassword
    });
    await user.save();
    demoData.forEach(ele => ele.email = user.email);
    await Card.insertMany(demoData);
}

async function connectMongoDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) { throw err; }
}

async function validatePassword(userData){
    try{
        const user = await User.findOne({email:userData.email});
        if(!user){
            return false;
        }else{
            return await bcrypt.compare(userData.password,user.password)
        }
    }catch(err){
        console.log("validation error in custom",err)
    }
}
module.exports = { signIn, connectMongoDb ,validatePassword}