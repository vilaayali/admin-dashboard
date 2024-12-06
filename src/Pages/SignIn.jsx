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
    const [isLogin, setIsLogin] = useState(false)
    const { saveToken, token } = useAuth()

    useEffect(() => {
        if (isLogin && token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [isLogin])

    const fetchSignInApi = async () => {
        let baseUrl = 'https://fakestoreapi.com/auth/login'
        try {
            const response = await axios.post(baseUrl, {
                username: 'mor_2314',
                password: "83r5^_"
            })
            const getToken = response.data.token;
            saveToken(getToken);
            setIsLogin(true)
        } catch (err) {
            alert("Wrong Username and pasword ", err);
        }
    }

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

