const mongoose = require("mongoose")


const cartItemSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        require:true,
        min:1
    }
},{versionKey:false,timestamps:true})



module.exports = mongoose.model("CartItem",cartItemSchema);