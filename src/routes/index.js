/* eslint-disable */
import { BrowserRouter, Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import CreateTeam from './CreateTeam'
import jwtDecode from 'jwt-decode'
import Login from './Login'
// const isAuthenticated = () => {
//   try {
//     jwtDecode(localStorage.getItem('token'))
//   } catch (error) {
//     return false
//   }
//   return true
// };
const ProtectedRoute = ({ children, ...props }) => {
  // if (!isAuthenticated()) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Route {...props} element={children} />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <SwitchRoutes>
        <Route path='/' exact element={<Home />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />
        {/* <ProtectedRoute path='/createTeam' exact >
          <CreateTeam
          />
        </ProtectedRoute> */}
      </SwitchRoutes>
    </BrowserRouter>
  )
}
export default Routes