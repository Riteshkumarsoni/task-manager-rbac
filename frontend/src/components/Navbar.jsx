import React, { useContext } from 'react';
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar-container">
      <div>
        <Link to="/" className='navbar-logo' >TaskManager RBAC</Link>
        <span className="navbar-logo-subscript"> ({user?.role || 'guest'})</span>
      </div>
      <div>
        {user ? (
          <>
            {/*<Link to="/">Dashboard</Link>
            <button onClick={() => navigate('/create')}>Create Task</button>*/}
            <button onClick={handleLogout} className='logout-button' type='button'>Logout <MdLogout /></button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className='login-button' type='button'>Login</button>
            </Link>
            <Link to="/register">
              <button className='register-button' type='button'>Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
