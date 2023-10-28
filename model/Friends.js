const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
    username:{type:String,required:true},
    friends:{type:[String]}
});

module.exports = mongoose.model("Friends",friendsSchema);