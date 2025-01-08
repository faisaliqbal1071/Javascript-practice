const express = require('express');
const { ClientSession } = require('mongodb');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')

const app = express()
app.use(express.json());
app.listen(3000, () =>{
    console.log('Server is running on 3000');
});




app.get('/', (req,res) => {
    res.send("Hello to the Node API and get uodated");
});
app.get('/api/getAll', async (req, res) => {
    try{
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
    

});
app.get('/api/findById/:id', async (req, res) => {
    try{
        const {id}= req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
    

});

// update product
app.put('/api/update/:id', async (req, res) => {
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
    

});
app.delete('/api/delete/:id', async (req, res) => {
    try{
        const {id}= req.params;
        await Product.deleteOne({_id:id});
        res.status(200).json({msg:"deleted successfully" });
        
    }
    catch (error){
        res.status(500).json({message: "error message", error});

    }
    

});


app.post('/api/products', async (req, res) => {
        try{
            const product = await Product.create(req.body);
            res.status(200).json(product);
        }
        catch (error){
            res.status(500).json({message: "error message", error});

        }
        

});

mongoose.connect("mongodb+srv://faisaliqbal1071:faisal1071@backend.f3ska.mongodb.net/?retryWrites=true&w=majority&appName=backend")
    .then(()=> {
console.log("Connect to the databse!");
})
    .catch(()=> {
        console.log("Database Error");
       
    });