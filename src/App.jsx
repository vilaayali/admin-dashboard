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


function App() {
  const { token, redirectingProduct } = useAuth()
  return (




    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginIn />} />
          <Route exact path="/product" element={<Product />} />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<DashBoard />} >
              <Route index element={<Product />} />
              <Route path='product' element={<Product />} />
              <Route path='catagories' element={<Catagories />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
