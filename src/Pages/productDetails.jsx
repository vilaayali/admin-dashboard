import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Typography, Container, Button } from '@mui/material';
import { useAuth } from '../authContext/authContext';
import Spinner from '../Component/progressSpinner';


// function ProductDetails() {
//     const { id } = useParams();
//     const { apiProducts } = useAuth();
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         console.log('Route ID:', id);
//         if (apiProducts.length > 0) {
//             const selectedProduct = apiProducts.find((p) => p.id === parseInt(id));
//             console.log('Selected Product:', selectedProduct);
//             setProduct(selectedProduct);
//         }
//     }, [id, apiProducts]);

//     console.log('apiProducts:', apiProducts);


//     if (!product) {
//         return <Typography variant="h6" align="center">
//             <Box sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//             }}>
//                 <Spinner />
//             </Box>
//         </Typography>;
//     }

//     return (
//         <Container
//             sx={{
//                 paddingTop: 5,
//                 paddingBottom: 5,
//                 backgroundColor: '#f9f9f9',
//                 borderRadius: 2,
//                 boxShadow: 3
//             }}
//         >
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: { xs: 'column', md: 'row' },  
//                     alignItems: 'center',
//                     gap: 4, 
//                 }}
//             >
//                 {/* Product Image */}
//                 <Box
//                     sx={{
//                         flex: 1,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         maxWidth: { xs: '100%', md: '50%' },
//                     }}
//                 >
//                     <img
//                         src={product.image}
//                         alt={product.title}
//                         style={{
//                             width: '70%',
//                             maxWidth: '400px',

//                         }}
//                     />
//                 </Box>

//                 {/* Product Details */}
//                 <Box
//                     sx={{
//                         flex: 1,
//                         textAlign: { xs: 'center', md: 'left' },
//                     }}
//                 >
//                     <Typography
//                         variant="h4"
//                         sx={{
//                             fontWeight: 'bold',
//                             marginBottom: 2,
//                             color: 'primary.main',
//                         }}
//                     >
//                         {product.title}
//                     </Typography>

//                     <Typography
//                         variant="h6"
//                         sx={{
//                             marginBottom: 2,
//                             color: 'success.main',
//                             fontWeight: 'medium'
//                         }}
//                     >
//                         Price: ${product.price}
//                     </Typography>

//                     <Typography
//                         variant="body1"
//                         sx={{
//                             marginBottom: 3,
//                             color: 'text.secondary',
//                             lineHeight: 1.6
//                         }}
//                     >
//                         {product.description}
//                     </Typography>

//                     <Button
//                         variant="contained"
//                         color="error"
//                         size="large"
//                         sx={{
//                             paddingX: 4,
//                             borderRadius: 2,
//                             boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
//                             '&:hover': {
//                                 backgroundColor: 'error.dark',
//                             },
//                         }}
//                     >
//                         Add to Cart
//                     </Button>
//                 </Box>
//             </Box>
//         </Container>

//     );
// }

function ProductDetails() {
    const { id } = useParams();
    const { apiProducts, addToCart } = useAuth();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (apiProducts.length > 0) {
            const selectedProduct = apiProducts.find((p) => p.id === parseInt(id));
            setProduct(selectedProduct);
        }
    }, [id, apiProducts]);

    if (!product) {
        return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    return (
        <Container>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    gap: 4,
                    padding: 4,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    maxWidth: '800px',
                    margin: '20px auto',
                    backgroundColor: '#fff',
                }}
            >
                {/* Product Image */}
                <Box
                    sx={{
                        flex: '1 1 40%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2,
                    }}
                >
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            objectFit: 'contain',
                        }}
                    />
                </Box>

                {/* Product Details */}
                <Box sx={{ flex: '1 1 60%' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: 2,
                            color: 'primary.main',
                        }}
                    >
                        {product.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            marginBottom: 3,
                            lineHeight: 1.6,
                            color: 'text.secondary',
                        }}
                    >
                        {product.description || 'No description available for this product.'}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: 'success.main',
                            marginBottom: 3,
                        }}
                    >
                        Price: ${product.price}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => addToCart(product)}
                        sx={{
                            paddingX: 4,
                            textTransform: 'none',
                            fontSize: '1rem',
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>

        </Container>
    );
}

export default ProductDetails;
