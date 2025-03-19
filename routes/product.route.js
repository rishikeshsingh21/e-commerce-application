/**
 * POST localhost:4000/api/v1/add-produt
 */

const product_controller = require("../controllers/product.controller")
const auth_mv = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecom/api/v1/add-product",[auth_mv.verifyToken,auth_mv.isAdminCheck,],product_controller.createProduct)
    app.get("/ecom/api/v1/findProducts",[auth_mv.verifyToken],product_controller.findProduct)
    app.patch("/ecom/api/v1/editProduct/:id",[auth_mv.verifyToken,auth_mv.isAdminCheck],product_controller.editProduct)
    app.delete("/ecom/api/v1/deleteProduct",[auth_mv.verifyToken,auth_mv.isAdminCheck],product_controller.deleteProduct)
    app.delete("/ecom/api/v1/deleteAllProduct",[auth_mv.verifyToken,auth_mv.isAdminCheck],product_controller.deleteAllProduts)
}