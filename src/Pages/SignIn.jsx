import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../authContext/authContext'
import { useNavigate } from 'react-router'

//MUI Form Component
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';


function SingIn() {
    let navigate = useNavigate()
    // const [isLogin, setIsLogin] = useState(false)
    const { saveToken, token, fetchSignInApi, isLogin } = useAuth()

    useEffect(() => {
        if (isLogin && token) {
            navigate("/dashboard");
        }
    }, [isLogin, token, navigate])

    // console.log("SignIn Token: ", data);
    console.log("login: ", isLogin);
    const providers = [
        { id: 'custom', button: true }
    ];

    return (
        <>

            {/* <button onClick={fetchSignInApi}> SignIn</button> */}
            <AppProvider theme={useTheme()}>
                <SignInPage signIn={fetchSignInApi} providers={providers} />

            </AppProvider>

        </>

    )
}


export default SingIn

