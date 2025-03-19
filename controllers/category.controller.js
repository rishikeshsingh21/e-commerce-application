/**
 * Controller for creating the category
 * 
 * POST localhost:4000/ecomm/api/v1/categories
 * 
 */
const category_model = require("../models/category.model")
const mongoose = require('mongoose')


exports.createNewCategory = async (req,res)=>{
  //validate for the input field
  if(!(req.body.name && req.body.description)){
    res.status(400).send({
      message:"Bad Request provid the name or discription in the requset body"
    })
  }

  //read the req body

  //Create the cateory object
  const cat_obj = {
    name: req.body.name,
    description: req.body.description
  }

  // Insert into mongodb
  try{

    const category = await category_model.create(cat_obj)
    res.status(200).send(category)
  }catch(err){
    console.log("Error while creatin the category:",err)
    res.status(500).send({
      message:"Internal Server Error{error while creating the category}"
    })
  }

  //return the response of the created category
}

exports.findCategory = async(req,res)=>{
  //get the name of category form the reqest boy
  const name = req.body.name;
  if(!name){
    res.send(400).send({
      message:"Provide the name of the category;{Bad request}"
    })
  }
  try{
    //find the category
    const category_obj = await category_model.findOne({name:name})
    if(!category_obj){
      return res.status(500).send({
        message:"Category of Product is not found"
      })
    }
    //send the category 
    res.status(200).send(category_obj);

  }catch(err){
    console.error(`Error retrieving the product ${err}`)
    res.status(500).send({
      message:'Error retrieving the product'
    })
  }
}

exports.findAllCategory = async (req,res)=>{
  //fetch all the category from the db
  //send all the category as response
  try{
    const categories = await category_model.find({})
    res.status(200).send(categories)
  }catch(err){
    console.log("Errors while finding the category");
    res.status(500).send({
      message:'NO category is presnt right now'
    })
  }

}

exports.editCategory = async (req,res)=>{
  //allow only to the admin to edit the category
  // this is check by middleware
  // const category = await category_model.findOne({})
  try{
    const {_id,newName,newDescription} = req.body
    //if both field is not provided then send error response
    if (!(newName || newDescription)) {
      return res.status(400).send({
        message: "Provide both the name and description of the category. {Bad Request}"
      });
    }
    
    const category = await category_model.findById(_id);
    if(!category){
      return res.status(404).send({
        message: "Category not found"
      });
    }
    const updatedCategory = await category_model.findByIdAndUpdate(
      _id,
      { $set: { name: newName, description: newDescription } },
      { new: true } // this will return the updated category instead of the old one
    );
    res.status(200).send({
      messsage:"The category is Updated successfully",
      updatedCategory:updatedCategory
    })

  }catch(err){
    console.log("Error while Updating the category:"+err);
    res.status(500).send({
      message:"Indternal Server Error"
    })
  }
 
}

exports.deleteCategory = async(req,res)=>{
  const {_id} = req.body
  if(!_id){
    return res.status(400).send({
      message:"Bad request"
    })
  }
  try{
    const delete_category = await category_model.findByIdAndDelete(_id)
    if (!delete_category) {
      return res.status(404).send({
        message: "Category not found"
      });
    }
    res.status(200).send({
      message:"Category is deleteld successfully",
      delete_category
    })
  }catch(err){
    console.log("Error while deleteing the category:"+err)
    res.status(500).send({
      message:"Internal Server Error"
    })
  }

}