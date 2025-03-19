/***
 * I need to write the controller / logic to register a user
 * 
 */
const bcrypt = require('bcrypt')
const user_model = require('../models/user.model.js')
const jwt = require("jsonwebtoken")
const authSecret = require("../configs/auth.config.js")

exports.singup = async(req,res)=>{
  /**
   * logic to create the user
   */
  //1. Read the request body

  const request_body = req.body   //gives the body of the request in the form of the js object

  // 2.Insert the data in the user collection in the MongDB
  const userObj = {
    name:request_body.name,
    userId:request_body.userId,
    email:request_body.email,
    password:bcrypt.hashSync(request_body.password,10),
    userType:request_body.userType
  }
  try{
    const user_created = await user_model.create(userObj)
    /**
     * return the user with https code
     */
    const res_obj ={
      name:user_created.name,
      userId:user_created.userId,
      email:user_created.email,
      userType:user_created.userType,
      createdAt:user_created.createdAt,
      updatedAt:user_created.updatedAt
    }
    res.status(201).send(res_obj)
  }catch(err){
    console.log("Error while registering the user:",err)
    res.status(500).send({
      message:"Some error happen while registering the user"
    })
  }



  // 3.Return the response back to the user
}

exports.signin = async (req,res)=>{
  //Check if the userId id present in the System
  const user = await user_model.findOne({userId:req.body.userId})
  if(!user){
    return res.status(400).send({
      message:"Enter a vaid userId"
    })
  }

  //Password isCorrect 
  const isPasswordVaild = bcrypt.compareSync(req.body.password,user.password)
  if(!isPasswordVaild){
    return res.status(400).send({
      message:"Wrong password passed"
    })
  }

  //Using JWT we will create teh access token with TTL and return it 

  const token = jwt.sign({id:user.userId},authSecret.secret,{
    expiresIn:600 // token expire in 120 minutes
  })  //on what bases making the token data and the screte

  res.status(200).send({
    name:user.name,
    userId:user.userId,
    email:user.email,
    userType:user.userType,
    accessToken:token
  })
}