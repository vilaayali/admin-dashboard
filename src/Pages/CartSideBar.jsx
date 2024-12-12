import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DialogBox from "../Component/dialogBox"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../authContext/authContext';

export default function RightSideDrawer() {
    const { cartProduct, removeFromCart } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handleClose = (id) => {
        removeFromCart(id);
    };

    // Calculate total price
    const totalPrice = cartProduct.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const onPlaceOrder = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        // Clear the cart
        cartProduct.forEach((item) => removeFromCart(item.id));
    };

    const list = () => (
        <Box sx={{ width: 450, marginTop: '100px', padding: 2 }}>
            <List>
                {cartProduct.length > 0 ? (
                    cartProduct.map((item) => (
                        <ListItem
                            key={item.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 2,
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                marginBottom: 2,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Product Image */}
                                <ListItemAvatar>
                                    <Avatar
                                        alt={item.title}
                                        src={item.image}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            marginRight: 2,
                                            border: '1px solid #ddd',
                                        }}
                                    />
                                </ListItemAvatar>

                                {/* Product Title and Quantity */}
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {item.title}
                                </Typography>
                            </Box>

                            {/* Price and Remove Button */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'success.main',
                                        fontWeight: 'bold',
                                        marginBottom: 1,
                                    }}
                                >
                                    ${item.price * item.quantity}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleClose(item.id)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1" align="center" color="textSecondary">
                        No items in cart.
                    </Typography>
                )}
            </List>

            {/* Divider and Total Price */}
            <Divider sx={{ marginY: 2 }} />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total Price:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ${totalPrice.toFixed(2)}
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={onPlaceOrder}
            >
                Place Order
            </Button>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <ShoppingCartIcon />
            </Button>
            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
            <DialogBox open={isDialogOpen} onClose={handleDialogClose} />
        </div>
    );
}
