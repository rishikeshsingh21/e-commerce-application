const product_model = require("../models/product.model");
const ObjectId = require("mongoose").ObjectId;

const cart_model = require("../models/cart.model/cart.model");
const cartItem_model = require("../models/cart.model/cartItem.model");


const addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id;  // userid is ObjectId type
      
      if (!productId || !quantity) {
        return res.status(400).send({
          message: "Enter the productId and the quantity to add",
        });
      }
  
      // Find product by ID
      const product = await product_model.findById(productId);
      if (!product) {
        return res.status(404).send({
          message: "Product not found",
        });
      }
  
      // Get the user's cart
      let cart = await cart_model.findOne({ userId: userId });
      if (!cart) {
        // If no cart exists, create a new one
        cart = await cart_model.create({ userId: userId, cartItems: [] });
      }
  
      // Check if the product is already in the cartItems
      let cartItem = await cartItem_model.findOne({ userId: userId, product: productId });
      
      if (!cartItem) {
        // If the cartItem doesn't exist, create a new one
        const newCartItem = new cartItem_model({
          userId: userId,
          product: productId,
          quantity: quantity,
        });
        console.log(" if the cart is created first time cart prise:"+cart.totalPrise)
        cart.totalPrise += quantity*product.price
        console.log("after"+cart.totalPrise);
        
        await cart.save()
        await newCartItem.save();
  
        // Push the newly created cartItem into the cart's cartItems array
        cart.cartItems.push(newCartItem._id);
        await cart.save();
  
        return res.status(200).send({
          message: "The product is added to the cart with the given quantity",
          cartItem: newCartItem,
        });
      } else {
        // If the product is already in the cart, update its quantity
        console.log("whichle updating the quantity cart prise:"+cart.totalPrise)
        cartItem.quantity += quantity;
        cart.totalPrise += (quantity*product.price);
        console.log("after"+cart.totalPrise);
        await cart.save();
        await cartItem.save();
  
        return res.status(200).send({
          message: "The quantity of the product is updated",
          cartItem: cartItem,
        });
      }
    } catch (err) {
      console.log("Error while adding the product to the cart:", err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  };

  const showCart = async(req,res)=>{
    try{
        const userId = req.user._id  
        const cart = await cart_model.findOne({userId:userId})
        
        // cart.cartItems.forEach(async(cartItemId) => {
        //     let eachCardItem = await cartItem_model.findOne({_id:cartItemId})

        // });
        res.status(200).send({
            message:"the Cart",
            cart:cart
        })

    }catch(err){
        console.log("Error while fetching the cart:"+err)
        res.status(500).send({
            message:"Internal server error"
        })
    }
  }

  const editCart = async(req,res)=>{
    const {productId} = req.body
    const userId = req.user._id
    //console.log(userId);
    //console.log(productId);
    if(!productId){
      return res.status(400).send({
        message: "Bad request please enter the productId"
      })
    }

    try{
      const product = await product_model.findById(productId)
      const prise = product.price;
      if(!product){
        return res.status(404).send({
          message:"Product is not found Enter a valid prodcutId"
        })
      }
      const cart = await cart_model.findOne({userId:userId})
      
      if(!cart){
        return res.status(400).send({
          message:"cart not present Create one"
        })
      }
      console.log("the cart before deletion:"+cart)
      const cartItem = await cartItem_model.findOne({userId:userId,product:productId})
      const quantity = cartItem.quantity;
      console.log("the product quantity:"+quantity);
      
      console.log("Id of cartItem to delete "+cartItem._id)
      if(!cartItem){
        return res.status(400).send({
          message:"Product is not present in your cart"
        })
      }
      ///cartItem is derefernce form the cart 
      //reducing the cart prise
      cart.totalPrise -= prise*quantity;
      console.log("cart aftr updating the prise:"+cart)
      cart.cartItems = cart.cartItems.filter(item => item.toString() !== cartItem._id.toString());
      console.log(cart.cartItems);
      await cart.save()
      // await cart_model.updateOne(
      //   {userId:userId},
      //   {$pull:{cartItems:cartItem._id}}
      // )
      //console.log("the cart after derefernce:\n"+await cart_model.findOne({userId:userId}))
      console.log("the cart which was fetch:\n"+cart)

      //now delete the cartItem
      const result = await cartItem_model.deleteOne({_id:cartItem._id})
      console.log(result);
      if(result.deletedCount === 1){
        return res.status(200).send({
          message:"The Product is deleted from your cart",
          result
        })
      }
    }catch(err){
      console.log("Internal Server Error: while deleting the product in the cart"+err)
      res.status(500).send({
        message : "Internal server error"
      })
    }
  }
  
  module.exports = {
    addToCart: addToCart,
    showCart:showCart,
    editCart:editCart
  };
  