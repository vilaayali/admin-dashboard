import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'

// Routing Imports
import React, { lazy, Suspense } from 'react';
import { Login } from '@mui/icons-material';
import ProtectedRoute from './Webroutes/protectedRoute';
const LoginIn = lazy(() => import("./Pages/SignIn"));
const DashBoard = lazy(() => import("./Pages/DashBoard"));
const Product = lazy(() => import("./Pages/Product"));
const Catagories = lazy(() => import("./Pages/Catagories"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginIn />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<DashBoard />} >
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
