import { BrowserRouter, Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import CreateTeam from './CreateTeam'
import jwtDecode from 'jwt-decode'
import Login from './Login'
const isAuthenticated = () => {
  try {
    jwtDecode(localStorage.getItem('token'))
  } catch (error) {
    return false
  }
  return true
};
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Routes = () => (
  <BrowserRouter>
    <SwitchRoutes>
      <Route path='/' exact element={<Home />} />
      <Route path='/register' exact element={<Register />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/createTeam' exact element={
        <ProtectedRoute>
          <CreateTeam />
        </ProtectedRoute>
      } />
    </SwitchRoutes>
  </BrowserRouter>
)
export default Routes