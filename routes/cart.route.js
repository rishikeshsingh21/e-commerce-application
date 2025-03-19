const auth_mv = require("../middlewares/auth.mw")
const cart_controller = require("../controllers/cart.controller")
module.exports = (app)=>{
    app.post("/ecom/api/v1/add-to-cart",[auth_mv.verifyToken],cart_controller.addToCart)
    app.get("/ecom/api/v1/yourcart",[auth_mv.verifyToken],cart_controller.showCart)
    app.delete("/ecom/api/v1/edit-cart",[auth_mv.verifyToken],cart_controller.editCart)
}