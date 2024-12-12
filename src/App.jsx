import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import './App.css'



// Routing Imports
import React, { lazy, Suspense } from 'react';
import { Login } from '@mui/icons-material';
import ProtectedRoute from './Webroutes/protectedRoute';
import { useAuth } from './authContext/authContext';
const LoginIn = lazy(() => import("./Pages/SignIn"));
const DashBoard = lazy(() => import("./Pages/DashBoard"));
const Product = lazy(() => import("./Pages/Product"));
const Catagories = lazy(() => import("./Pages/Catagories"));
const User = lazy(() => import("./Pages/userAndadmin"));
const ProductDetails = lazy(() => import("./Pages/productDetails"));
// const CartSideBar = lazy(() => import("./Pages/CartSideBar"));


function App() {
  const { token } = useAuth()
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<LoginIn />} />
          {/* <Route path="/cartsideBar" element={<CartSideBar />} /> */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashBoard />}>
              <Route index element={<Product />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="catagories" element={<Catagories />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
