const mongoose = require("mongoose");
 
const sharedCardSchema = new mongoose.Schema({
    from:{type:String ,required:true},
    to:{type:String , required:true},
    heading:{type:String , required:true},
    date:{type:String , required:true},
    note:{type:String , required:true}
});

module.exports = mongoose.model("SharedCards", sharedCardSchema);