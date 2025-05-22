// const express = require('express')
import express from "express"; 
import { connectDB } from './config/db.js'; 
import router from "./routes/product.route.js";
import dotenv from "dotenv"; 

dotenv.config(); 

// So now I am putting the express func in the app variable
const app = express(); 
const PORT = process.env.PORT

// Middleware
app.use(express.json()); // What this does is that it allows us to accept JSON data from the user, as then only we can parse it to Javascript object for us to understand it completely 
app.use("/api/products", router); 

// Starting the server and making sure it's running at localhost 3000
app.listen(3000, () => { 
    connectDB(); 
    console.log("Server started at http://localhost:" + PORT); 
})