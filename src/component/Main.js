import React, {useContext} from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'

/* react toast */
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

/* component */
import AdminDashboard from './Admin/AdminDashboard'
import Login from './Auth/Login'
import Register from './Auth/Register'
import About from './screens/About'
import Contact from './screens/Contact'
import Home from './screens/Home'
import Menu from './screens/Menu'
import UserDashboard from './User/UserDashboard'
import Pnf from './Util/Pnf'
import ProtectedRoute from '../middleware/ProtectedRoute'
import Profile from './screens/Profile'
import Order from './screens/Order'


function Main(props) {
  const context = useContext(GlobalContext)

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
  const [isUser, setIsUser] = context.authApi.isUser;

  return (
      <Router>
          <Menu />
          <ToastContainer autoClose={5000} position="top-center" />
          <Routes>
              <Route path={`/`} element={<Home/>} />
              <Route path={`/about`} element={<About/>} />
              <Route path={`/contact`} element={<Contact/>} />
              <Route path={`/login`} element={ isLogged ? <Pnf/> : <Login/>} />
              <Route path={`/register`} element={isLogged ? <Pnf/>: <Register/>} />
                <Route path={`/user/dashboard`} element={
                          <ProtectedRoute auth={isLogged} >
                              <UserDashboard/>
                          </ProtectedRoute>
                      } />
              <Route path={`/admin/dashboard`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <AdminDashboard/>
                                                          </ProtectedRoute>
                                                      }  />
              <Route path={`/profile`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <Profile/>
                                                          </ProtectedRoute>
                                                      }  />
              <Route path={`/orders`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <Order/>
                                                          </ProtectedRoute>
                                                      }  />
              <Route path={`/*`} element={<Pnf/>} />
          </Routes>
    </Router>
  )
}

export default Main