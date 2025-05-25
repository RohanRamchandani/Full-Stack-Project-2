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
        const res = await fetch('/api/products', {
            method: "POST", 
            headers: { 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newProduct)
        });
        const data = await res.json(); 
        set((state) => ({products:[...state.products, data.data]})); // ({}) means i am returning a new state
        return {success: true, message: "Product created successfully."}; 
    }, 
    fetchProduct: async () => { 
        const res = await fetch('/api/products'); 
        const data = await res.json(); 
        set({products: data.data}); 
    }, 
    deleteProduct: async (pid) => { 
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        }); 
        const data = await res.json(); 
        if (!data.success) return {success: false, message: data.message}; 

        set((state) => ({ products: state.products.filter((product) => product.id !== pid)})); 
        return {success: true, message: data.message}; 
    },
    updateProduct: async (pid, updatedProduct) => { 
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(updatedProduct), 
        });   
        const data = await res.json(); 
        
        if (!data.success) return {success: false, message: data.message}; 

        set((state) => ({
            products: state.products.map((product) => (product.id === pid ? data.data : product)), 
        })); 
        return {success: true, message: data.message}; 
    }, 
}))