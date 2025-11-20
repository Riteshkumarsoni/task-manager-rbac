import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEditTask from './pages/CreateEditTask';
import ProtectedRoute from './utils/ProtectedRoute';
import './index.css'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/create" element={<ProtectedRoute><CreateEditTask/></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><CreateEditTask/></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export default App