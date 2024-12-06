import { createContext, useContext, useState } from "react";
import axios from 'axios'

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {

    // Getting Token from localStorage
    const getLocalStorage = () => {
        const tokenSaved = localStorage.getItem("Token")
        return tokenSaved ? JSON.parse(tokenSaved) : "";
    }

    //Getiing Product from local storage
    const getProductFromLocal = () => {
        const productsSaved = localStorage.getItem("products")
        return productsSaved ? JSON.parse(productsSaved) : "";
    }

    //Getiing Categories from local storage
    const getCategoriesFromLocal = () => {
        const categoriesSaved = localStorage.getItem("categories")
        return categoriesSaved ? JSON.parse(categoriesSaved) : "";
    }

    // UseSate Inititlizations
    const [token, setToken] = useState(getLocalStorage)
    //product State
    const [apiProducts, setApiProducts] = useState(getProductFromLocal)
    //Categories State;
    const [apiCategories, setApiCategories] = useState(getCategoriesFromLocal);



    //Save Token in Local Storage
    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('Token', JSON.stringify(newToken));
        // console.log("Auth Context Token Log", newToken);
    }



    // Fetch Api From Product
    const fetchProductApi = async () => {
        const notProData = getProductFromLocal()
        if (notProData) {
            setApiCategories(notProData);
            return;
        }

        let baseUrl = "https://fakestoreapi.com/products"
        try {
            const response = await axios.get(baseUrl);
            const productResponse = response.data;
            setApiProducts(productResponse);
            localStorage.setItem('products', JSON.stringify(productResponse));
        } catch (err) {
            console.log("Error in fetching api ", err);
        }
    }


    // Fetch api For Categories
    const fetchCategoriesApi = async () => {
        const noCatData = getCategoriesFromLocal()
        if (noCatData) {
            setApiCategories(noCatData);
            return;
        }
        let baseUrl = "https://fakestoreapi.com/products/categories"
        try {
            const response = await axios.get(baseUrl);
            const getCatResponse = response.data;
            setApiCategories(getCatResponse);
            localStorage.setItem('categories', JSON.stringify(getCatResponse));
            console.log(apiCategories);

        } catch (err) {
            console.log("Error in fetching Categories api ", err);

        }
    }
    return (<AuthContext.Provider value={

        {
            saveToken,
            token,
            apiProducts,
            fetchProductApi,
            fetchCategoriesApi,
            apiCategories
        }
    }>
        {children}
    </AuthContext.Provider>
    )
}