const express = require("express")
const mongoose = require("mongoose")
const {PORT} = require("./configs/sever.config.js")
const {DBURL,DBNAME} = require("./configs/db.config.js")
const user_model = require("./models/user.model.js")
const bcrypt = require("bcrypt")



const app = express()

app.use(express.json());  /// a middleware that convert the json from the postman to the javaScript object

                         // a middleware are the function in js which has three parameters (req,res,next) 

app.get('/',(req,res)=>{
  res.send("Server is Started")
})

//connection to the DB
mongoose.connect(DBURL+DBNAME);

const db = mongoose.connection;

db.on('error',()=>{
  consoel.log('Error while connecting to the Database')
})

db.once('open',()=>{
  console.log("DataBase is connected Succesfully")
  init() // function to create the admin 
})

/**
 * Create an admin user at the starting of the application 
 * if not already present
 */

async function init(){
  try{
    let user =  await user_model.findOne({userId: "admin"})
    if(user){
      console.log("Admin is already present",user)
      return
    }
  }catch(err){
    console.log("Error while reading the data from the DB",err)
  }
  try{
    user = await user_model.create({
      name:"Rishieksh",
      userId : "admin",
      email:"rishikeshsingh@gmail.com",
      userType:"ADMIN",
      password:bcrypt.hashSync("welcome1",8)
    })
    //console.log("Admin created:", user)
    
  }catch(err){
    console.log("Error while creating admin:"+err)
  }
}

/**
 * Stich the route to the server
 */

require("./routes/auth.route")(app)  //calling auth route and passing the app object
require("./routes/category.route")(app)//calling the category route and passign the app object
require("./routes/product.route")(app)//calling the product route and passing the app object 
require("./routes/cart.route.js")(app);//calling the cart route and passing the app object

/**
 * start the server
 */

app.listen(PORT,()=>{
  console.log(`Server is Started on the PORT number: ${PORT}`)
})