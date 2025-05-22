import { useState, useEffect } from 'react'; 
import { Box, Container, VStack, Heading, useColorModeValue, Input, Button, useToast } from "@chakra-ui/react"; 
import { useProductStore } from '../../store/product';
import {useLocation} from 'react-router-dom'; 

const CreatePage = () => { 
    // 1st Hook
    const [newProduct, setNewProduct] = useState({
        name: "", 
        price: "", 
        image: "", 
    }); 

    const toast = useToast(); // Toast in Chakra UI basically is like a notification bar that pops up when you are done with something 
    
    // 2nd Hook
    const { createProduct } = useProductStore(); 

    const location = useLocation(); // Tracks if there are any route changes from the create route itself (/create)

    useEffect(() => {
        if (location.pathname === "/create" && location.state?.fromNavbar) { 
            setNewProduct({name: "", price: "", image: ""}); 
        }
    },[location]); // [location] runs every single time when [location] changes

    // Handles the Adding Product button
    const handleAddProduct = async () => { 
        const {success, message} = await createProduct(newProduct)
        if (!success) { 
            toast({
                title: "Error", 
                description: message, 
                status: "error",
                duration: 5000,
                isClosable: true, 
            })
        } else { 
            toast({ 
                title: "Success", 
                description: message, 
                status: "success", 
                duration: 5000, 
                isClosable: true, 
            })
        }
        setNewProduct({name: "", price: "", image: ""}); 
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>

                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box width={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}></Input>
                        <Input placeholder='Price' name='price' value={newProduct.price} type="number" onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}></Input>
                        <Input placeholder='Image URL' name='image' value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}></Input>
                        <Button colorScheme='blue' w={'full'} onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    ) 
}

export default CreatePage; 