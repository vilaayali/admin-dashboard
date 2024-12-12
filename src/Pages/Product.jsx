import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Typography,
    Grid,
    Box,
    Container,
} from '@mui/material';
import Spinner from '../Component/progressSpinner';
import { useAuth } from '../authContext/authContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InPageNavBar from '../Component/InPageNavBar';
import { green } from '@mui/material/colors';
import { useNavigate } from 'react-router';

function Product() {
    const { handelDelete, apiProducts, fetchProductApi, sortData, setApiProducts, token, role } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        if (!apiProducts.length) fetchProductApi();
    }, [fetchProductApi, apiProducts, role, token]);

    const displayData = sortData.length ? sortData : apiProducts;

    const navigate = useNavigate();

    // Dynamic Card Route
    const handleCardClick = (productID) => {
        setSelectedProduct(productID);
        setIsDialogOpen(true);
        if (role === "admin") {
            navigate(`/dashboard/product/${productID}`);
        }
        if (role === "user") {
            navigate(`/product/${productID}`);
        }
        console.log('produvt id', selectedProduct)
    };


    const handleEditClick = (product) => {
        setEditProduct({ ...product });
        setIsEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setIsEditDialogOpen(false);
        setEditProduct(null);
    };

    const handleEditSave = () => {
        const updatedProducts = apiProducts.map((product) =>
            product.id === editProduct.id ? editProduct : product
        );
        setApiProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        handleEditClose();
    };

    console.log("Product Token", token);
    console.log('Selected Product', selectedProduct)

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
            <InPageNavBar />
            <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Products
                </Typography>

                {displayData.length > 0 ? (
                    <Grid container spacing={3}>
                        {displayData.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                                    <CardMedia
                                        component="img"
                                        alt={product.title}
                                        height="250"
                                        image={product.image}
                                        sx={{ objectFit: 'contain', padding: '10px' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            {product.title}
                                        </Typography>
                                        <Typography variant="body1" align="center">
                                            <strong>Price:</strong> ${product.price}
                                        </Typography>
                                    </CardContent>
                                    {/* Card Action Button */}
                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        <Button onClick={() => handleCardClick(product.id)} color="primary" variant="outlined">
                                            Open
                                        </Button>

                                        {role === "admin" && (
                                            <>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleEditClick(product)}
                                                >
                                                    <EditNoteIcon />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handelDelete(product.id)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </>
                                        )}
                                    </CardActions>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Spinner />
                )}
            </Container>
            {/* Edit Product Dialog */}
            <Dialog
                open={isEditDialogOpen}
                onClose={handleEditClose}
                fullWidth
                maxWidth="sm"
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 3,
                        boxShadow: 5,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        backgroundColor: 'secondary.main',
                        color: 'white',
                    }}
                >
                    Edit Product
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    {editProduct && (
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                p: 1,
                            }}
                        >
                            <input
                                type="text"
                                value={editProduct.title}
                                onChange={(e) =>
                                    setEditProduct({ ...editProduct, title: e.target.value })
                                }
                                placeholder="Title"
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                }}
                            />
                            <input
                                type="number"
                                value={editProduct.price}
                                onChange={(e) =>
                                    setEditProduct({ ...editProduct, price: e.target.value })
                                }
                                placeholder="Price"
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                }}
                            />
                            <textarea
                                value={editProduct.description}
                                onChange={(e) =>
                                    setEditProduct({ ...editProduct, description: e.target.value })
                                }
                                placeholder="Description"
                                rows="4"
                                style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
                    <Button
                        onClick={handleEditClose}
                        variant="outlined"
                        color="secondary"
                        sx={{ px: 4, borderRadius: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditSave}
                        variant="contained"
                        color="primary"
                        sx={{ px: 4, borderRadius: 2 }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

export default Product;
