import { useState, useContext } from 'react';
import { MdLogin } from "react-icons/md";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-register-container">
      <img src='https://res.cloudinary.com/dh8g9mloe/image/upload/v1763615985/computer-security-with-login-password-padlock_z3w1ph.jpg' alt='login-img' className='login-register-img' />
      <div>
        <div className='login-register-heading-container'>
          <h2 className='login-heading'>Login</h2>
          <MdLogin className='login-register-icon' />
        </div>
        <form onSubmit={submit}>
          <label htmlFor='userName'>Username</label>
          <input id='userName' name="username" value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})} />
          <label htmlFor='password'>Password</label>
          <input id='password' type="password" name="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} />
          <div><button type="submit" className='login-credentials-btn'>Login</button></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
