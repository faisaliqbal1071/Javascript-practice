const express = require('express');
const { ClientSession } = require('mongodb');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const productRoute= require("./routes/product.route.js");
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.listen(3000, () =>{
    console.log('Server is running on 3000');
});

// routes
app.use('/api', productRoute);


app.get('/', (req,res) => {
    res.send("Hello to the Node API and get updated");
});
let products = [];

// POST endpoint to add a product
app.post('/api/products', [
    // Validation middleware
    check('name').isLength({ min: 1 }).withMessage('Product name is required')
                  .isAlphanumeric().withMessage('Product name must contain only letters and numbers'),
    check('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    check('price').isFloat({ min: 0.01 }).withMessage('Price must be a positive number greater than 0'),

], (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, process the data (save product, etc.)
    const { name, quantity, price } = req.body;
    const newProduct = { name, quantity, price };
    Product.push(newProduct);

    return res.status(201).json(newProduct);
});

// Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
// databse connection
mongoose.connect("mongodb+srv://faisaliqbal1071:faisal1071@backend.f3ska.mongodb.net/?retryWrites=true&w=majority&appName=backend")
    .then(()=> {
console.log("Connect to the databse!");
})
    .catch(()=> {
        console.log("Database Error");
       
    });