const mongoose = require("mongoose")



const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CartItem"
    }],
    totalPrise:{
        type:Number,
        default:0.0
    }
},{versionKey:false,timestamps:true})

module.exports = mongoose.model("Cart",cartSchema);