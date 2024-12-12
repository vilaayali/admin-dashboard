import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../authContext/authContext';
import { FormControl, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import Popup from './Popup';
import { Navigate, useNavigate } from 'react-router';
import CartSiderBar from "../Pages/CartSideBar"
import { Spinner } from 'react-bootstrap';


function InPageNavBar() {
    const { alphabeticalOrder, limit, handleAlphabeticalOrderChange, handleLimitChange, apiProducts, setApiProducts, fetchCartApi, token, navigateToLoginPage, role, setToken, setRole } = useAuth();

    const [showPop, setShowPop] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleAddProduct = (newProduct) => {

        const updatedProducts = [...apiProducts, { ...newProduct, id: apiProducts.length + 1 }];
        setApiProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('Token');
        const storedRole = localStorage.getItem('role');

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedRole) {
            setRole(storedRole);
        }
        setLoading(false)
    }, []);


    if (loading) {
        return <Spinner />;
    }

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', padding: 2 }}>
            <Tabs centered>
                <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Alphabetical Order</InputLabel>
                        <Select
                            value={alphabeticalOrder}
                            onChange={handleAlphabeticalOrderChange}
                            label="Alphabetical Order"
                        >
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Limit</InputLabel>
                        <Select
                            value={limit}
                            onChange={handleLimitChange}
                            label="Limit"
                        >
                            <MenuItem value="5">Limit: 5</MenuItem>
                            <MenuItem value="10">Limit: 10</MenuItem>
                            <MenuItem value="15">Limit: 15</MenuItem>
                            <MenuItem value="20">Limit: 20</MenuItem>
                        </Select>
                    </FormControl>

                    <DialogActions>


                        {token && role === "admin" ? <Button
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#191950",
                                padding: "5px 15px",
                                fontSize: "15px",
                                color: "white"
                            }}
                            onClick={() => setShowPop(true)}>
                            Add New Product
                        </Button> :
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => navigateToLoginPage(navigate)}>
                                Chosses Role
                            </Button>}

                        <Popup
                            title="Add New Product"
                            onShow={showPop}
                            onHide={() => setShowPop(false)}
                            onSubmit={handleAddProduct}
                            editBtnText="Add Product"
                            fields={[
                                { name: "title", label: "Title", placeholder: "Enter title" },
                                { name: "price", label: "Price", placeholder: "Enter price", type: "number" },
                                { name: "category", label: "Category", placeholder: "Enter category" },
                                { name: "description", label: "Description", placeholder: "Enter description" },
                                { name: "image", label: "Upload Image", type: "file" },
                            ]}
                        />
                        <Button
                            variant="outlined">
                            <CartSiderBar />
                        </Button>
                    </DialogActions>
                </Box>
            </Tabs>
        </Box>
    );
}

export default InPageNavBar;

