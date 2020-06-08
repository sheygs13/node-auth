import React, { useState }  from 'react';
import {Link} from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const { email, password } = inputs;

  const handleChange = ({ target }) => {
     const { name, value } = target;
     setInputs({
      ...inputs,
      [name]: value
     })
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
        const body = { email, password }

        const response = await fetch('http://localhost:3000/api/v1/auth/signin', {
          method: "POST",
          headers: {"Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        const data = await response.json();
        window.localStorage.setItem('token', JSON.stringify(data.token));
        setAuth(true);
     } catch ({ message }) {
        console.error(message);
     }
  };

  return (
     <>
        <h2 className="text-center">Login</h2>
         <form onSubmit={handleSubmit} autoComplete="off">
             <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input 
                       id="email" 
                       name="email"
                       value={email}
                       onChange={handleChange}
                       className="form-control" 
                       type="email"
                       required
                 />
             </div>
             <div className="form-group">
                 <label htmlFor="password">Password</label>
                 <input 
                       id="password" 
                       name="password"
                       value={password}
                       onChange={handleChange} 
                       className="form-control" 
                       type="password"
                       required
                 />
             </div>
             <button type="submit" className="btn btn-success btn-block">Login</button>
         </form>
         <Link style={{ textDecoration: 'none', color: '#333' }} to="/register">Sign Up</Link>
     </>
  )
};


export default Login;