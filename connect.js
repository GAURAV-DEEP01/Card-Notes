const mongoose = require('mongoose');
const demoData = require("./demo-card-data/demoData");
const User = require('./model/User');
const Card = require('./model/Card');
const Friends = require("./model/Friends");
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function signIn(username,userEmail, userPassword) {
    try{
        const user = new User({
            username: username,
            email: userEmail,
            password: userPassword
        });
        const friend = new Friends({
            username:username,
            friends:[]
        })
        await Promise.all([user.save() ,friend.save()]);
        demoData.forEach(ele => ele.userId = user._id.toString());
        await Card.insertMany(demoData);
        const userId= user._id.toString();
        return {userId,username};
    }catch(err){ throw err; }
}

async function connectMongoDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true });
    } catch (err) { throw err; }
}

async function validatePassword(userData){
    try{
        const user = await User.findOne({email:userData.email});
        if(!user)
            return null;
        const userId = user._id.toString();
        const username = user.username;
        return await bcrypt.compare(userData.password,user.password) ? {userId,username}  : null;
    }catch(err){
        console.log("validation error :",err);
        throw err;
    }
}
async function addFriend(username,friend=null){
    try{
        const user = await Friends.findOne({username});
        if(!user.friends.includes(friend)&&friend){
            user.friends.push(friend);
            await user.save()
        }
        return user.friends;
    }catch(err){ throw err; }
}
module.exports = { signIn, connectMongoDb ,validatePassword,addFriend}