import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Spinner from "../Component/progressSpinner"


//Card Components Imports
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Grid } from '@mui/material';
import { useAuth } from '../authContext/authContext';


function Product() {
    const { apiProducts, fetchProductApi, token } = useAuth()
    const [sortOption, setSortOption] = useState('all-products')

    //Select Options Button
    const handelsortChange = (e) => {
        setSortOption(e.target.value)
    }

    // Fetch api when page mount 
    useEffect(() => {
        fetchProductApi()
    }, [])

    // console.log("api products Values", apiProducts);

    return (
        <>
            <h1>Product</h1>
            <select
                className="w-50"
                value={sortOption}
                onChange={handelsortChange}
            >
                <option value="all-products">All Products</option>
                <option value="ascending">Alphabetically, A-Z</option>
                <option value="descending">Alphabetically, Z-A</option>
                <option value="high-price">High Price</option>
                <option value="low-price">Low Price</option>
            </select>
            <p>Seleted : {sortOption}</p>
            <span></span>
            {apiProducts.length > 0 ? (
                <Grid container spacing={3}>
                    {apiProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    height="140"
                                    image={product.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <h4>{product.title}</h4>
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <p>${product.price}</p>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Delete</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default Product
