/**
 * POST localhost:4000/ecom/api/v1/auth/signup
 * I need to intercept this
 */
const auth_controller = require("../controllers/auth.controller")
const auth_mv = require("../middlewares/auth.mw")
module.exports = (app)=>{
  app.post("/ecom/api/v1/auth/signup",[auth_mv.verifySignUpBody],auth_controller.singup)
  app.post("/ecom/api/v1/auth/signin",[auth_mv.verifySignInBody],auth_controller.signin)
}