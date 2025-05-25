import express from "express"; 
import { connectDB } from './config/db.js'; 
import router from "./routes/product.route.js";
import dotenv from "dotenv"; 

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use("/api/products", router); 

// Start the server
app.listen(PORT, () => { 
    connectDB(); 
    console.log(`Server started at http://localhost:${PORT}`); 
}) 