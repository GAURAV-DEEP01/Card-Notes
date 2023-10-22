const mongoose = require('mongoose');
const demoData = require("./demo-card-data/demoData");
const User = require('./model/User')
const Card = require('./model/Card')
const bcrypt = require('bcryptjs')
require('dotenv').config();

async function signIn(userEmail, userPassword) {
    try{
        const user = new User({
            email: userEmail,
            password: userPassword
        });
        await user.save();
        demoData.forEach(ele => ele.userId = user._id.toString());
        await Card.insertMany(demoData);
        return user._id.toString();
    }catch(err){
        console.error(err)
        throw err;
    }
}

async function connectMongoDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) { throw err; }
}

async function validatePassword(userData){
    try{
        const user = await User.findOne({email:userData.email});
        if(!user)
            return null;
        return await bcrypt.compare(userData.password,user.password) ? user._id.toString() : null;
    }catch(err){
        console.log("validation error :",err)
        throw err;
    }
}
module.exports = { signIn, connectMongoDb ,validatePassword}