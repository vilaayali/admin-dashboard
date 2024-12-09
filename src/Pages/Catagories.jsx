import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from "../Component/progressSpinner";
import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, CardActions, Button, Typography, Grid } from '@mui/material';
// import { CardContent, CardMedia, CardActions, Button, Typography, Grid } from '@mui/material';
import { useAuth } from '../authContext/authContext';



function Categories() {
    const {
        fetchCategoriesApi,
        apiCategories,
        SubCategoriesApi,
        subcategoryProducts
    } = useAuth()
    const [selectedCategorey, setSelectedCategorey] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    // const [sortOption, setSortOption] = useState('all-products')




    //handel Categorey
    const handelCategorey = (category) => {
        SubCategoriesApi(category)
        setSelectedCategorey(category)
        setIsDialogOpen(true);
    }

    const handelDialogClose = () => {
        setSelectedCategorey(null)
        setIsDialogOpen(false);
    }

    // Fetch api when page mount 
    useEffect(() => {
        fetchCategoriesApi()
        SubCategoriesApi()
    }, [])

    // console.log("api categories data", apiCategories);
    return (
        <>
            <h1>Catagories Page </h1>

            {apiCategories.length > 0 ? (
                <Grid container spacing={3}>
                    {apiCategories.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }} onClick={() => handelCategorey(item)}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.length > 0 ? item : <Spinner />}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Spinner />
            )}

            <Dialog open={isDialogOpen} onClose={handelDialogClose} fullWidth maxWidth="lg">
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    {subcategoryProducts.length > 0 ? (
                        <Grid container spacing={3}>
                            {subcategoryProducts.map((product) => (
                                <Grid item xs={12} sm={6} md={4} key={product.id}>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            alt={product.title}
                                            height="250"
                                            image={product.image}
                                            sx={{
                                                objectFit: 'contain',
                                                backgroundColor: '#f5f5f5',
                                                padding: '10px',
                                            }}
                                        />
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                sx={{
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    color: 'primary.main',
                                                }}
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{
                                                    mb: 2,
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {product.description}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 'medium',
                                                    textAlign: 'center',
                                                    mt: 2,
                                                }}
                                            >
                                                <strong>Price:</strong> ${product.price}
                                            </Typography>
                                        </CardContent>

                                        <CardActions sx={{ justifyContent: 'center' }}>
                                            <button onClick={() => handleCardClick(product)}>Open</button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Spinner />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default Categories
