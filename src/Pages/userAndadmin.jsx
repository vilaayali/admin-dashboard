import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useAuth } from '../authContext/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';


function LoginPage() {
    const { role, setRole, UserSettingData, adminSettingData, token } = useAuth()
    const navigation = useNavigate();



    useEffect(() => {
        const savedRole = localStorage.getItem('role')
        if (savedRole) {
            setRole(savedRole);
        }
    }, [setRole])
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                minHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                overflow: 'hidden',
            }}
        >
            <h1
                style={{
                    color: '#333',
                    fontSize: '4rem',
                    marginBottom: '20px',
                    border: '2px,solid,black',
                    padding: '20px',
                    fontWeight: 'bold'

                }}
            >
                Login Page
            </h1>
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                }}
            >
                <Button
                    variant="contained"
                    onClick={() => UserSettingData(navigation)}
                    sx={{
                        backgroundColor: '#AB4459',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#913b4e',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                >
                    User Login
                </Button>

                <Button
                    onClick={() => adminSettingData(navigation)}
                    variant="contained"
                    sx={{
                        backgroundColor: '#1B1833',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#151227',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                >
                    Admin Login
                </Button>
            </Box>
        </Box>
    );
}

export default LoginPage;
