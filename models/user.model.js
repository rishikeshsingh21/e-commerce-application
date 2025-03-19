const mongoose = require('mongoose')

/**
 * A user schema with the following field using the mongoose
 * A schema defines the structure of the documents in a MongoDB collection.
 * name 
 * userId
 * password
 * email 
 * userType
 */
const userShecma = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  userId:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    lowercase:true,
    min:10,
    unique:true
  },
  userType:{
    type:String,
    default:"CUSTOMER",
    enum:["CUSTOMER","ADMIN"]
  }

},{versionKey:false,timestamps:true})

//create collection users in mongoDB using the userschema
module.exports = mongoose.model("User",userShecma);
