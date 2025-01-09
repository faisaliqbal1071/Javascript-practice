const Product= require("../models/product.model.js");

const getProducts=  async(req,res)=>{
    try{
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
};

const getProduct= async(req, res) => {
    try{
        const {id}= req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
    

};
const createProduct=   async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
};
 const updateProduct= async (req, res) => {
    try{
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:"Product not Found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
};

const deleteProduct= async (req, res) => {
    try{
        const {id}= req.params;
        await Product.deleteOne({_id:id});
        res.status(200).json({msg:"deleted successfully" });
        
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
    

};




module.exports= {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

