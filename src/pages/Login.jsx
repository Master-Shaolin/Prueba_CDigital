import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';

import Spinner from '../components/Spinner';

import { motion } from 'framer-motion/dist/framer-motion';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());

  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    }

    dispatch(login(userData));
  }

  if(isLoading) {
    return(<Spinner />)
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <div className="container" id="login">
        <div className="row">
          <div className="col-md-6 login-left">
            <section className="heading text-center">
              <h1>Account Login</h1>
            </section>
            <section className="form">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" name="username" id="username" 
                    value={username} placeholder='Enter your username' autoComplete='off'
                    onChange={onChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" id="password" 
                    value={password} placeholder='Enter password'
                    onChange={onChange}/>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-dark">Log In</button>
                </div>
              </form>
            </section>
          </div>
          <div className="col-md-6 login-right">
            <img src={require('../assets/img/183266.jpg')} alt=""/>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Login