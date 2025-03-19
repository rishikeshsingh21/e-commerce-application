/**
 * Create a mw eill check if the reqiest body is proper and correct
 */
const user_model = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const authSecret = require("../configs/auth.config.js")
const verifySignUpBody = async (req,res,next)=>{
  try{
    //Check for the name
    if(!req.body.name){
      return res.status(400).send({
        message:"Failed ! Name was not provided in the request body"
      })
    }
    //Check for the email
    if(!req.body.email){
      return res.status(400).send({
        message:"Failed ! Email was not provided in the request body"
      })
    }
    //Check for the userId
    if(!req.body.userId){
      return res.status(400).send({
        message:"Failed ! UserId was not provided in the request body"
      })
    }
    //Check if the user with the same userId is already present
    const user = await user_model.findOne({userId:`${req.body.userId}`})
    if(user){
      return res.status(400).send({
        message:"UserId is in Use"
      })
    }
    //if everything goes write pass to the next

    next()

  }catch(err){
    console.log("Error while validating the request boject",err)
    res.status(500).send({
      message:"Error while validating the request body"
    })
  }
}

const verifySignInBody = (req,res,next)=>{
  if(!req.body.userId){
    return res.status(400).send({
      message:"UserId is not provided"
    })
  }
  if(!req.body.password){
    return res.status(400).send({
      message:"password is not provided"
    })
  }

  next();
}

const verifyToken = (req,res,next)=>{
  //Check if the token is presnt in the header
  const token = req.headers["x-access-token"]
  if(!token){
    return res.status(403).send({
      message:"No token found : UnAuthorized"
    })
  }

  // if its the valid token
  jwt.verify(token,authSecret.secret,async(err,decoded)=>{
    if(err){
      return res.status(401).send({
        message:"UnAuthorized"
      })
    }
    const user = await user_model.findOne({userId:decoded.id})
    if(!user){
      return res.status(400).send({
        message:"UnAuthorized, this user for this token doesn't exist"
      })
    }
    req.user = user;  // set the user in the request
    //console.log(req.user);
    //set the user info in the request body 
  //then move to the next step
  next()
  })

  
}

const isAdminCheck = (req,res,next)=>{
  ///error
  const user = req.user;
  //console.log(user)
  //console.log(user.userType)
  if(user && user.userType === "ADMIN"){
    next();
  }else{
    return res.status(403).send({
      message:"Only ADMIN user are allow to access this endpoint"
    })
  }
}

module.exports = {
  verifySignUpBody:verifySignUpBody,
  verifySignInBody:verifySignInBody,
  verifyToken:verifyToken,
  isAdminCheck:isAdminCheck
}