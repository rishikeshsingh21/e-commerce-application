const product_model = require("../models/product.model");
const category_model = require("../models/category.model")

//create the product 
exports.createProduct = async (req,res)=>{
    //fetch all the product parameters from request body
    const {
        name,
        discription,
        price,
        quantity,
        brand,
        discountPrice,
        categoryId,
    } = req.body;

    
    // //console.table([name,
    //     discription,
    //     price,
    //     quantity,
    //     brand,
    //     discountPrice,
    //     categoryId,])


    //validate all the require field in the request body
    if(!name|| !discription || !price || !quantity || !brand || !categoryId ){
        return res.status(400).json({
            error: "All fields are required: name, discription, price, quantity, brand and categoryId"
          });
    }
    //create the product object to save in the db
    const product_obj = {
        name:name,
        discription:discription,
        price:price,
        quantity:quantity,
        brand:brand,
        discountPrice:discountPrice,
        category : categoryId
    }
    //console.log("The product is: " + JSON.stringify(product_obj, null, 2));
    try{
        const category = await category_model.findById(categoryId);
        if (!category) {
             return res.status(400).json({
            error: "Category not found. Please provide a valid category.",
         });
        }
        const product = await product_model.create(product_obj);
        res.status(200).send({
            message:"Product Creadted Successfully",
            product_details:product
        })
    }catch(err){
        console.log("Error While creation the product:"+err)
        res.status(500).send({
            message:"Internal server error"
        })
    }

}

//find the product based on the name

exports.findProduct = async(req,res)=>{
    // console.log(req.user);
    // console.log(req.body);
    const searchQuery = req.body.name;
    // 
    if (!searchQuery) {
        return res.status(400).json({ message: 'Search query is required' });
    }
    try{
        const products = await product_model.find({
            name:{$regex:searchQuery, $options:'i'}  //name: { $regex: searchQuery, $options: 'i' }
        })
        if(products.length === 0){
            return res.status(404).send({
                message:"product not found"
            })
        }
        res.json({
            products
        })
        

    }catch(err){
        console.error(`Error in searching:${err}`)
        res.status(500).send({
            message:"Error while searching the product"
        })
    }
}

// Edit the product 

exports.editProduct =  async (req,res)=>{
    try{
        const productId = req.params.id;
        //console.log(productId)
        const updatedFields = req.body;

        const allowToUpdateFields = ['name', 'discription', 'price', 'quantity', 'brand', 'discountPrice']

        const updatedKeys = Object.keys(updatedFields);
        const isValidToUpdate = updatedKeys.every((fields)=>allowToUpdateFields.includes(fields))
        if(!isValidToUpdate){
            return res.status(400).send({
                message:"Invalid fieds to Updates"
            })
        }
        const product = await product_model.findById(productId);
        if(!product){
            return res.status(400).send({
                message:"Product is not found"
            })
        }
        const updatedProduct = await product_model.findByIdAndUpdate(
            productId,
            {$set:updatedFields},
            {new:true}
        )
        res.status(200).send({
            updatedProduct
        })

    }catch(err){
        console.error("Error while editing the Product:"+err);
        res.status(500).json({
            message:"Error updating product"
        });
    }
}


exports.deleteProduct = async (req,res)=>{
    const objectId = req.body._id;
    if(!objectId){
        return res.status(400).send({
            message:"Please provide the object id to delete the Product"
        })
    }
    try{
        const deletedProduct = await product_model.findByIdAndDelete(objectId)
        if(!deletedProduct){
            return res.status(404).send({
                message:"Product is not found"
            })
        }
        res.status(200).send({
            message:"Product is deleted succefully",
            deletedProduct
        })

    }catch(err){
        console.error("Internal server error:"+err);
        res.status(500).send({
            message:"Internal Server error(while Deleting the product)"
        })
    }
}

//delete all the products in the particular category
exports.deleteAllProduts = async(req,res)=>{
    const category_id = req.body._id;
    console.log(category_id)
    if(!category_id){
        return res.status(400).send({
            message:"provide the category id field as {_id}"
        })
    }
    try{
       const deletedAllProduct = await product_model.deleteMany({category:category_id})
       if(deletedAllProduct.deletedCount > 0){
         res.status(200).send({
            message:`all Product in this category is deleted: [number is ${deletedAllProduct.deletedCount}] `
        })
       }else{
        res.status(200).send({
            message:"Category don't have any products"
        })
       }

    }catch(err){
        console.log("Error deleting products in category:"+err);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}