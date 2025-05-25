import { Text, Box, Heading, HStack, Image, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button, VStack} from '@chakra-ui/react';
import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useProductStore } from '../../store/product';
import { useState } from 'react';
import { useToast, useColorModeValue, useDisclosure} from '@chakra-ui/react';


const ProductCard = ({product}) => {
    const textColor = useColorModeValue('gray.600', 'gray.200'); 
    const bg = useColorModeValue('white', 'gray.800'); 

    const toast = useToast(); 
    const {deleteProduct, updateProduct} = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);  
    const {isOpen, onOpen, onClose} = useDisclosure(); 

    const handleDeleteProduct = async (pid) => { 
        const {success, message} = await deleteProduct(pid); 
        if (!success) { 
            toast({ 
                title: "Error", 
                description: message, 
                status: 'error', 
                duration: 3000, 
                isClosable: true, 
            }); 
        }
        else { 
            toast({
                title: "Success", 
                description: message, 
                status: 'success', 
                duration: 3000, 
                isClosable: true, 
            })
        }
    }; 

    const handleUpdateProduct = async (pid, updatedProduct) => { 
        const {success, message} = await updateProduct(pid, updatedProduct); 
        onClose(); 
        if (!success) { 
            toast({
                title: 'Error', 
                description: message, 
                status: 'error', 
                duration: 3000, 
                isClosable: true, 
            }); 
        }
        else { 
            toast({
                title: 'Success', 
                description: message, 
                status: 'success', 
                duration: 3000, 
                isClosable: true, 
            }); 
        }
    }; 
  return (
    <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{transform: "translateY(-5px)", shadow:'xl'}} bg={bg}>
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'></Image>

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={<CiEdit/>} onClick={onOpen} colorScheme='blue'></IconButton>
                <IconButton icon={<MdDeleteOutline/>} onClick={() => handleDeleteProduct(product._id)}></IconButton>
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay /> {/* This creates the dimness in the background once the modal thing pops up */}
            <ModalContent>
                <ModalHeader>
                    Update Product
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}></Input>
                        <Input placeholder='Price' name='price' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}></Input>
                        <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}></Input>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                        Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard; 