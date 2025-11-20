import { useState, useContext } from 'react';
import { FaCashRegister } from "react-icons/fa6";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="login-register-container">
      <img src='https://res.cloudinary.com/dh8g9mloe/image/upload/v1763617270/16640_zvu9ko.jpg' alt='register-img' className='login-register-img' />
      <div>
        <div className='login-register-heading-container'>
          <h2 className='register-heading'>Register</h2>
          <FaCashRegister className='login-register-icon' />
        </div>
        <form onSubmit={submit}>
          <label htmlFor='userName'>Username</label>
          <input id='userName' name="username" value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})} />
          <label htmlFor='password'>Password</label>
          <input id='password' type="password" name="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} />
          <div><button type="submit" className='register-credentials-button'>Register</button></div>
        </form>
      </div>
    </div>
  );
};

export default Register;
