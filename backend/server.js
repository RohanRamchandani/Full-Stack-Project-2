// const express = require('express')
import express from "express"; 
import { connectDB } from './config/db.js'; 
import { Product } from './models/product.js'; 

// So now I am putting the express func in the app variable
const app = express(); 

// Middleware
app.use(express.json()); // What this does is that it allows us to accept JSON data from the user, as then only we can parse it to Javascript object for us to understand it completely 

// Routes
// 1st Route
app.post("/api/products", async (req, res) => {
    const product = req.body; // This is when the user will send the data

    if (!product.name || !product.price || !product.image) { 
        return res.status(400).json({success: false, message: "Please provide all fields"}); 
    }

    // Assuming the data we got is working, in the sense that this product is valid, I want it to be in the format of the schema that we made
    const newProduct = new Product(product); 
    
    try { 
        await newProduct.save(); // Wait till the newProduct is saved in the database
        res.status(201).json({success: true, data: newProduct()}); 
    }
    catch(error) { 
        console.log("Error in creating a product:", error.message); 
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}); 

// 2nd Route
app.delete("/api/products/:id", async (req, res) => { 
    const {id} = req.params; 

    try { 
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success: true, message: "product is deleted"}); 
    }
    catch (error) { 
        res.status(500).json({success: false, message: "Server error"}); 
    }
}); 

// 3rd Route 
app.get("/api/products", async (req, res) => { 
    try {
        const products = await Product.find({}); 
        res.status(200).json({success: true, data: products}); 
    }
    catch (error) { 
        console.log("Error in fetching all of the datas"); 
        res.status(500).json({success: false, message: "Server error"}); 
    }
}); 

// 4th Route
app.put("/api/prodcuts/:id", async (req, res) => { 
    const {id} = req.params; 
    const product = req.body; 

    if (!mongoose.Types.ObjectId.isValidid(id)) { 
        return res.status(404).json({success: false, message: "Invalid Product ID"}); 
    }
    
    try { 
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); // This means that I am replacing the old product with the new one when new is true, otherwise if true is false, then I am updating the product with an empty product
        res.status(200).json({success: true, data: updatedProduct}); 
    }
    catch (error) {     
        res.status(500).json({success: false, message: "Server error"}); 
    }
}); 






// Starting the server and making sure it's running at localhost 5000
app.listen(3000, () => { 
    connectDB(); 
    console.log("Server started at http://localhost:3000"); 
})
