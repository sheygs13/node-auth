import React, { useState } from 'react';
import {log} from console;
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import '../App.css';

const Register = ({ setAuth }) => {
 const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

 const { name, email, password } = inputs;

 const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({
       ...inputs,
      [name]: value
    })
 };

 const handleSubmit = async e => {
    e.preventDefault();
    try {
        const body = {name, email, password};

        const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(body)
        });

       const data = await response.json();
       // log(data);
       if(data.token) {
          localStorage.setItem('token', JSON.stringify(data.token));
          setAuth(true);
          toast.success('Signed Up Successfully');
       } else {
          setAuth(false);
          toast.error(data.message);
       }
    } catch ({ message }) {
       console.error(message)
    }
 }

 return (
    <>
     <h2 className="text-center my-3">Register</h2>
     <form onSubmit={handleSubmit} className="mx-auto" autoComplete="off">
        <div className="form-group">
           <label htmlFor="name">Name</label>
           <input id="name" 
                  className="form-control" 
                  type="text" 
                  name="name" 
                  value={name} 
                  onChange={handleChange}
                  required
                  placeholder="name" 
          />
        </div>
        <div className="form-group">
           <label htmlFor="email">Email</label>
           <input id="email" 
                  className="form-control" 
                  type="email" 
                  name="email" 
                  value={email} 
                  onChange={handleChange}
                  required
                  placeholder="email" 
           />
        </div> 
        <div className="form-group">
           <label htmlFor="password">Password</label>
           <input id="password" 
                  className="form-control" 
                  type="password" 
                  name="password" 
                  value={password} 
                  onChange={handleChange}
                  required
                  placeholder="password" 
           />
        </div> 
        <button className="btn btn-dark btn-block" type="submit">Sign Up</button>    
     </form>
     <Link style={{ textDecoration: 'none', color: '#333' }} to="/login">Sign In</Link>
    </>
 )
};

export default Register;
