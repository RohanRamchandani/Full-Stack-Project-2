// Zustand is a small state management which allows you to create Hook API functions that can then be stored globally and be used by other parts of the application easily
import { create } from 'zustand'; // Create itself allows you to create a state or whatever you call it 

// Set is Zustand's way to update state, kind of like setState
export const useProductStore = create((set) => ({
    products: [], 
    setProducts: (products) => set({products}), 
    createProduct: async (newProduct) => { 
        if (!newProduct.name || !newProduct.price || !newProduct.image) { 
            return {success: false, message: "Please fill in all the fields."}
        }
        const res = await fetch("/api/products", {
            method: "POST", 
            headers: { 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newProduct)
        })
        const data = res; 
        set((state) => ({products:[...state.products, data.data]})); // ({}) means i am returning a new state
        return {success: true, message: "Product created successfully."}; 
    }
}))