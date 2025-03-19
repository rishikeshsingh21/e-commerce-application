/**
 * name 
 * Discription
 */
const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    unique :true
  },
  description:{
    type:String,
    require:true
  }
},{versionKey:false,timestamps:true})

module.exports = mongoose.model("Category",categorySchema)