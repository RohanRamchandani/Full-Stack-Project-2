import {Container, VStack, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => { 

    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack spacing={8}>
                <Text fontSize={30} fontWeight={"bold"} textAlign={"center"} bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text">
                    Current Products 🚀
                </Text>

                <Text fontSize='xl' fontWeight={"bold"} textAlign={"center"} color='gray.500'>
                    No Products Found!{" "}
                    <Link to={'/create'}>
                        <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>
                            Create a product 
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    )
}

export default HomePage; 