import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from "../Component/progressSpinner";
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Grid } from '@mui/material';
import { useAuth } from '../authContext/authContext';


function Categories() {
    const { fetchCategoriesApi, apiCategories } = useAuth()
    // const [sortOption, setSortOption] = useState('all-products')



    // Fetch api when page mount 
    useEffect(() => {
        fetchCategoriesApi()
    }, [])

    // console.log("api categories data", apiCategories);
    return (
        <>
            <h1>Catagories Page </h1>

            {apiCategories.length > 0 ? (
                <Grid container spacing={3}>
                    {apiCategories.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.length > 0 ? item : <p>No data here</p>}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Spinner />
            )
            }

        </>
    )
}

export default Categories
