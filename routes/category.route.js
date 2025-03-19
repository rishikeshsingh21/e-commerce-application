/**
 * POST localhost:4000/api/v1/categories
 */
const category_controller = require('../controllers/category.controller')
const auth_mv = require("../middlewares/auth.mw")
const category_mv = require("../middlewares/category_mv")
module.exports = (app)=>{
  app.post("/ecom/api/v1/create/category",[auth_mv.verifyToken,auth_mv.isAdminCheck],category_controller.createNewCategory)
  app.get("/ecom/api/v1/find/category",[auth_mv.verifyToken],category_controller.findCategory)
  app.get("/ecom/api/v1/find",[auth_mv.verifyToken],category_controller.findAllCategory)
  app.put("/ecom/api/v1/editCategory",[auth_mv.verifyToken,auth_mv.isAdminCheck],category_controller.editCategory)
  app.delete("/ecom/app/v1/deleteCategory",[auth_mv.verifyToken,auth_mv.isAdminCheck,category_mv.isCategoryEmpty],category_controller.deleteCategory)
}