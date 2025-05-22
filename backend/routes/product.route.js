import express from "express"; 
import { deleteProducts, getProducts, postProducts, putProducts } from "../controller/product.controller.js";

const router = express.Router(); // This is creating a new router object 

// Routes
// 1st Route
router.post("/", postProducts); 

// 2nd Route
router.delete("/:id", deleteProducts); 

// 3rd Route 
router.get("/", getProducts); // This will be easier to understand with the code separation 
// So in the get, I can just put the imported function from product.controller.js 

// 4th Route
router.put("/:id", putProducts); 

export default router; 