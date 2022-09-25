/* eslint-disable */
import { BrowserRouter, Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import CreateTeam from './CreateTeam'
import jwtDecode from 'jwt-decode'
import Login from './Login'
import { useState } from 'react'
import { SessionProvider } from '../context/Session'
const isAuthenticated = () => {
  try {
    jwtDecode(localStorage.getItem('token'))
  } catch (error) {
    return false
  }
  return true
};
const ProtectedRoute = ({ children, ...props }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Routes = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <SwitchRoutes>
          <Route path='/' exact element={<ProtectedRoute path='/' exact ><Home /></ProtectedRoute>} />
          <Route path='/register' exact element={<Register />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/createTeam' exact element={<ProtectedRoute path='/createTeam' exact ><CreateTeam /></ProtectedRoute>} />
        </SwitchRoutes>
      </BrowserRouter>
    </SessionProvider>
  )
}
export default Routes