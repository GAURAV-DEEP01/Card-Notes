const mongoose = require('mongoose');
const demoData = require("./demo-card-data/demoData");
const User = require('./model/User');
const Card = require('./model/Card');
const Friends = require("./model/Friends");
const SharedCards = require("./model/SharedCards");
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signIn = async (username,userEmail, userPassword)=>{
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

exports.connectMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{ useUnifiedTopology: true,useNewUrlParser: true});
    } catch (err) { throw err; }
}

exports.validatePassword = async (userData)=>{
    try{
        const user = await User.findOne({email:userData.email});
        if(!user)
            return null;
        const userId = user._id.toString();
        const username = user.username;
        return await bcrypt.compare(userData.password,user.password) ? {userId,username}  : null;
    }catch(err){
        console.error("validation error :",err);
        throw err;
    }
}

exports.createCard = async(user) =>{
    try {
        const card = new Card ({
            userId:String(user.userId),
            heading:String(user.heading),
            date:String(user.date),
            note:String(user.note)
        })
        await card.save();
    } catch (err) { throw err}
}

exports.addFriend = async(username,friend=null)=>{
    try{
        const user = await Friends.findOne({username});
        if(friend&&!user?.friends?.includes(friend)){
            user.friends.push(friend);
            await user.save();
        }
        return user.friends;
    }catch(err){ throw err; }
}

exports.receiveCards = async(sentCard)=>{
    try{
        const card = new SharedCards(sentCard)
        await card.save()
    }catch(err){ throw err }
}

exports.getSharedCards = async(username)=>{
    try{
        const recievedCards =  SharedCards.find({to:username})
        const sentCards =  SharedCards.find({from:username})
        return await Promise.all([recievedCards,sentCards])
    }catch(err){ throw err }
}
