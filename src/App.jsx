import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'

// Routing Imports
import React, { lazy, Suspense } from 'react';
import { Login } from '@mui/icons-material';
import ProtectedRoute from './Webroutes/protectedRoute';
const LoginIn = lazy(() => import("./Pages/SignIn"));
const DashBoard = lazy(() => import("./Pages/DashBoard"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/login" element={<LoginIn />} />

            <Route element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<DashBoard />} />
            </Route>


          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
