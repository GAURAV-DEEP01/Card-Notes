const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
   username:{type :String, required : true, unique : true},
   email:{type: String, required :true,unique : true},
   password:{type :String, required : true}
},{timestamps:true})

UserSchema.pre("save", async function(){
   this.password = await bcrypt.hash(this.password,10)
})

const User =  mongoose.model( 'User',UserSchema)
module.exports = User;