import React, { useState, useEffect } from 'react'

const Dashboard = ({ setAuth }) => {
 const [name, setName] = useState("");

 const getProfile = async () => {
     try {
       const response = await fetch('http://localhost:3000/api/v1/dashboard',{
          method: "GET",
          headers: { authorization : `Bearer ${JSON.parse(localStorage.getItem('token'))}`}
       })

       const data = await response.json();
       setName(data.name)
     } catch ({ message }) {
       console.error(message);
     }
 };

 const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
 }

 // the "[]" for useEffect to
 // make only one request
 useEffect(() => {
   getProfile()
 }, []);

 return (
    <>
      <h2>Dashboard</h2>
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Welcome {name}!</h5>
            <p className="card-text">Please Log out.</p>
            <button onClick={logOut} className="btn btn-primary">Logout</button>
          </div>
        </div>
    </>
 )
};

export default Dashboard;