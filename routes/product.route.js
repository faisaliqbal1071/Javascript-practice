const express= require("express");
const Product= require("../models/product.model.js");
const router = express.Router();
const {getProducts,getProduct,createProduct,updateProduct,deleteProduct}= require('../controller/product.controller.js');
const { model } = require("mongoose");


router.get('/getAll', getProducts);
router.get('/findById/:id', getProduct);

router.post("/products", createProduct);
//update a product
router.put("/update/:id",updateProduct);
// delete a product
router.delete("/delete/:id", deleteProduct);



module.exports = router;