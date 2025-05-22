import mongoose from "mongoose"; 

const productSchema = new mongoose.Schema({
    // Product Name
    name: { 
        type: String, 
        required: true
    }, 
    price: { 
        type: Number, 
        required: true
    }, 
    image: { 
        // Image should be in string as you will be putting in the URL of the image later on
        type: String, 
        required: true
    }, 
}, {
    timestamps: true // CreatedAt and UpdatedAt a certain time 
});

const Product = mongoose.model('Product', productSchema); 
export default Product; 