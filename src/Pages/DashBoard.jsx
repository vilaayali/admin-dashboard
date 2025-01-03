import React from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useAuth } from '../authContext/authContext';
import { useEffect } from 'react';

const drawerWidth = 240;

export default function ClippedDrawer() {

    const { handelLogOut, token } = useAuth()
    const navigate = useNavigate()

    const logOut = () => {
        handelLogOut(navigate);
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token]);



    const menuItems = [
        { text: 'Products', path: '/dashboard/product' },
        { text: 'Categories', path: '/dashboard/catagories' },
        { text: 'Log Out', onclick: logOut },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                {item.onclick ? (
                                    <ListItemButton
                                        onClick={item.onclick}
                                        sx={{
                                            textDecoration: 'none',
                                            '&.active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                                        }}
                                    >
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                ) : (
                                    <ListItemButton
                                        component={NavLink}
                                        to={item.path}
                                        sx={{
                                            textDecoration: 'none',
                                            '&.active': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                                        }}
                                    >
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItemButton>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
