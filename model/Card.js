const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
    userId:{type:String, required:true },
    heading:{type:String , required:true},
    date:{type:String , required:true},
    note:{type:String , required:true}
},{timestamps:true});
module.exports = mongoose.model('Card',cardSchema);