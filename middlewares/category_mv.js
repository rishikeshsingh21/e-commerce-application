const category_model = require("../models/category.model")
const product_model = require("../models/product.model")



const isCategoryEmpty = async (req,res)=>{
    const _id = req.body._id;
    try{
        const category = await category_model.findById(_id);
        if(!category){
            return res.status(400).send({
                message:`category with the given id:${_id} is not found`
            })
        }
        const NumOfProductInCategory = await product_model.countDocuments({category:_id})

        if(NumOfProductInCategory > 0){
            return res.status(400).send({
                message:`Category has ${NumOfProductInCategory}  products so first empty the category`
            })
        }

    }catch(err){
        console.log('Error:'+err);
        res.status(500).send({
            message:"Internal Server Error:"
        })
    }
}

module.exports = {
    isCategoryEmpty:isCategoryEmpty
}