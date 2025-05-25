import { Container, SimpleGrid, Text, VStack} from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../../store/product';

const HomePage = () => {
	const {fetchProduct, products} = useProductStore(); 

	useEffect(() => { 
		fetchProduct(); 
	}, [fetchProduct]); // As soon as I refresh or any, or as soon as it fetches a new data, it will show it there regarless

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text fontWeight={'bold'} fontSize={30} textAlign={'center'} bgGradient={'linear(to-r, cyan.400, blue.500)'} bgClip={'text'}>
					Current Product 🚀
				</Text>

				<SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} w={'full'}>
					{products.map((product) => ( 
						<ProductCard key={product.id} product={product}></ProductCard>
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
						No Products Found! {" "}
						<Link to={'/create'} >
							<Text as='span' color='blue.500' _hover={{textDecoration: 'underline'}}>
								Create a Product
							</Text>
						</Link>
					</Text>
				)}; 

			</VStack>
		</Container>
  	)
}
export default HomePage; 