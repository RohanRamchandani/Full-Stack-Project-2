import Product from "../models/product.js"; 
import mongoose from "mongoose"; 

// 1st Get Products controller 
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.status(200).json({success: true, data: products}); 
    }
    catch (error) { 
        console.log("Error in fetching all of the datas"); 
        res.status(500).json({success: false, message: "Server error"}); 
    }
}

// 2nd Post Products controller
export const postProducts = async (req, res) => { 
    const product = req.body; // This is when the user will send the data
    
    if (!product.name || !product.price || !product.image) { 
        return res.status(400).json({success: false, message: "Please provide all fields"}); 
    }
    
    // Assuming the data we got is working, in the sense that this product is valid, I want it to be in the format of the schema that we made
    const newProduct = new Product(product); 
        
    try { 
        await newProduct.save(); // Wait till the newProduct is saved in the database
        res.status(201).json({success: true, data: newProduct}); 
    }
    catch(error) { 
        console.log("Error in creating a product:", error.message); 
        res.status(500).json({success: false, message: "Server Error"}); 
    }
}

export const putProducts = async (req, res) => {
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
}

export const deleteProducts = async (req, res) => { 
    const {id} = req.params; 

    try { 
        await Product.findByIdAndDelete(id); 
        res.status(200).json({success: true, message: "product is deleted"}); 
    }
    catch (error) { 
        res.status(500).json({success: false, message: "Server error"}); 
    }
}