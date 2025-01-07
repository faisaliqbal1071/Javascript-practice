const express = require('express')
const mongoose = require('mongoose');

const app = express()



app.listen(3000, () =>{
    console.log('Server is running on 3000');
}
);
app.get('/', (req,res) => {
    res.send("Hello to the Node API and get uodated");
});
mongoose.connect("mongodb+srv://faisaliqbal1071:faisal1071@backend.f3ska.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backend")