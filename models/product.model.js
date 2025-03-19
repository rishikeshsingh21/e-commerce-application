const mongoose = require("mongoose");
const { applyTimestamps } = require("./category.model");

/**
 * product name
 * Product prise
 * product discription 
 * product image 
 * createdBy
 * 
 */
const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
     price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  // Category as a reference to the Category model (MongoDB ObjectId)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,  
  }
},{versionKey:false,timestamps:true})

module.exports = mongoose.model("Product",productSchema);