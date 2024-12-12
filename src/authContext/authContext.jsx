import { createContext, useContext, useState, } from "react";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router";

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


    // UseSate Inititlizations
    const [token, setToken] = useState(getLocalStorage)
    //product State
    const [apiProducts, setApiProducts] = useState(getProductFromLocal)
    //Categories State;
    const [apiCategories, setApiCategories] = useState("");
    //Sub Category Products
    const [subcategoryProducts, setSubcategoryProducts] = useState([]);
    //For sorting data out Accourding to Index 
    const [sortData, setSortData] = useState([])
    //for limite/initaial 
    const [limit, setLimit] = useState(5);
    //alphabetical works like a charam  
    const [alphabeticalOrder, setAlphabeticalOrder] = useState("");
    //id storage
    const [selectedId, setSelectedId] = useState(null);
    //signin State
    const [isLogin, setIsLogin] = useState(false)
    //Cart State 
    const [cartProduct, setCartProduct] = useState([]);
    //Role
    const [role, setRole] = useState(null);



    //UserLocal Storage
    const UserSettingData = (navigate) => {
        localStorage.setItem("role", "user");
        setRole("user");
        navigate('/login')
    }
    //UserLocal Storage
    const adminSettingData = (navigate) => {
        localStorage.setItem("role", "admin");
        setRole("admin");
        navigate('/login')
    }


    // Fetch SignIn Api
    const fetchSignInApi = async () => {
        let baseUrl = 'https://fakestoreapi.com/auth/login'
        try {
            const response = await axios.post(baseUrl, {
                username: "mor_2314",
                password: "83r5^_"
            });
            const token = response.data.token;

            if (token) {
                saveToken(token);
                setIsLogin(true);
            } else {
                throw new Error("Token not found in response");
            }
        } catch (err) {
            // Handle and log errors
            console.error("Login failed:", err);
            alert("Wrong Username and Password");
        }

    }


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
        let baseUrl = "https://fakestoreapi.com/products/categories"
        try {
            const response = await axios.get(baseUrl);
            const getCatResponse = response.data;
            setApiCategories(getCatResponse);
            console.log(apiCategories);

        } catch (err) {
            console.log("Error in fetching Categories api ", err);

        }
    }

    //Specific Categorey Routing 
    const SubCategoriesApi = async (catagory) => {
        let baseUrl = `https://fakestoreapi.com/products/category/${catagory}`
        try {
            const response = await axios.get(baseUrl);
            const getSubCatResponse = response.data;
            setSubcategoryProducts(getSubCatResponse)
            console.log(apiCategories);

        } catch (err) {
            console.log("Error in fetching Categories api ", err);

        }
    }


    //LogOut Functionality
    const handelLogOut = (navigate) => {
        localStorage.removeItem("Token")
        setToken(null);
        navigate('/');
        localStorage.removeItem("categories")
        localStorage.removeItem("products")
        localStorage.removeItem("role")
    }

    // navigateToLoginPage
    const navigateToLoginPage = (navigate) => {
        setToken(null)
        localStorage.removeItem("products")
        localStorage.removeItem("Token")
        localStorage.removeItem("role")
        navigate("/");
        setApiProducts('');
    };


    //OrderSorting
    const OrderSorting = async (sequence, limitValue) => {
        let baseUrl = `https://fakestoreapi.com/products?sort=${sequence}&limit=${limitValue}`
        try {
            const response = await axios.get(baseUrl);
            const resData = response.data;
            setSortData(resData)
            console.log(sortData);

        } catch (err) {
            console.log("Error in fetching Categories api ", err);

        }
    }

    const handleAlphabeticalOrderChange = (e) => {
        const selectValue = e.target.value;
        setAlphabeticalOrder(selectValue);
        OrderSorting(selectValue, limit)
    };

    const handleLimitChange = (e) => {
        const selectedLimit = e.target.value;
        setLimit(selectedLimit);
        OrderSorting(alphabeticalOrder, selectedLimit);
    };


    // DeleteProduct
    const handelDelete = (id) => {
        const displayData = sortData.length ? sortData : apiProducts;
        setSelectedId(id);
        const updatedProducts = displayData.filter((product) => product.id !== id);
        setApiProducts(updatedProducts);
    };


    // //Fetching Cart api 
    // const fetchCartApi = async () => {
    //     let baseUrl = `https://fakestoreapi.com/carts`
    //     try {
    //         const response = await axios.get(baseUrl);
    //         const resData = Array.isArray(response.data) ? response.data : [];
    //         setCartProduct(resData)
    //         console.log(cartProduct);

    //     } catch (err) {
    //         console.log("Error in fetching Categories api ", err);

    //     }
    // }


    const addToCart = async (product) => {
        try {
            const payload = {
                userId: 5,
                date: new Date(),
                products: [
                    {
                        productId: product.id,
                        quantity: 1,
                    },
                ],
            };

            console.log("date", payload.date);

            // Make a POST request to the fake store API
            const response = await axios.post('https://fakestoreapi.com/carts', payload);
            const newCartItem = response.data;

            // Update the cart state
            setCartProduct((prev) => {
                const existing = prev.find((item) => item.id === product.id);
                if (existing) {
                    // Increment quantity if the product exists
                    return prev.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                // Add the new product
                return [...prev, { ...product, quantity: 1 }];
            });

            console.log('Item added to cart:', newCartItem);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };


    //delete data from cart
    const removeFromCart = async (productId) => {
        const deletApiCall = `https://fakestoreapi.com/carts/${productId}`
        try {
            await axios.delete(deletApiCall)
            const updatedDeleteData = (prev) =>
                prev.filter((item) => item.id !== productId)
            setCartProduct(updatedDeleteData);
        } catch (err) {
            console.log(err);

        }
    }


    return (<AuthContext.Provider value={

        {
            //User data
            UserSettingData,
            adminSettingData,
            role,
            setRole,

            //SignIn Api
            fetchSignInApi,
            isLogin,

            // For Token
            saveToken,
            token,
            setToken,

            // for ProductAPI
            apiProducts,
            setApiProducts,
            fetchProductApi,

            //for Category api
            fetchCategoriesApi,
            apiCategories,

            //For sub category
            SubCategoriesApi,
            subcategoryProducts,

            //For Logout
            handelLogOut,
            navigateToLoginPage,

            // for sorting data
            sortData,
            alphabeticalOrder,
            limit,
            handleAlphabeticalOrderChange,
            handleLimitChange,

            //Delete Function
            handelDelete,

            //CartApi 
            // fetchCartApi,
            cartProduct,
            removeFromCart,
            addToCart,
        }
    }>
        {children}
    </AuthContext.Provider>
    )
}