import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    // Getting from localStorage
    const getLocalStorage = () => {
        const tokenSaved = localStorage.getItem("Token")
        // console.log("get data from local", tokenSaved);
        return tokenSaved ? JSON.parse(tokenSaved) : [];

    }

    // UseSate Inititlizations
    const [token, setToken] = useState(getLocalStorage)



    //Save Token in Local Storage
    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('Token', JSON.stringify(newToken));
        console.log("Auth Context Token Log", newToken);
    }

    return (<AuthContext.Provider value={{ saveToken, token }}>
        {children}
    </AuthContext.Provider>
    )
}