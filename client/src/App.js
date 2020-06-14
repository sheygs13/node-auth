import React, {Fragment, useState, useEffect } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from 'react-router-dom';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = bool => setIsAuthenticated(bool);

  // when user is in a protected route and refreshes the browser,
  // the user is redirected back to login whilst the token is still valid.
  // this util method is used to prevent the user from being redirected back
  // to login by verifying the validity of the token.
  const isAuth = async () => {
     try {

       const response = await fetch('http://localhost:3000/api/v1/auth/verify',{
         method: "GET",
         headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}
       })

       const data = await response.json();
       if (data){
         setIsAuthenticated(true);
       }
       else { 
         setIsAuthenticated(false); 
       }
     } catch ({ message }) {
       console.error(message);
     }
  }

  useEffect(() => {
     isAuth();
  }, [])

  return (
    <Fragment>
      <Router>
          <div className="container">
            <Switch>
               <Route 
                 exact path="/login" 
                 render= {
                   props => 
                    !isAuthenticated ? (
                      <Login {...props} setAuth={setAuth}/>
                    ) : ( 
                      <Redirect to= "/dashboard"/>
                    ) 
                  } 
                 />
               <Route 
                 exact path="/register" 
                 render={
                   props => 
                    !isAuthenticated ? ( 
                      <Register {...props} setAuth={setAuth}/>
                    ) : ( 
                      <Redirect to="/login"/>
                    ) 
                  } 
                 />
               <Route 
                 exact path="/dashboard" 
                 render={
                   props => 
                    isAuthenticated ? ( 
                      <Dashboard {...props} setAuth={setAuth}/>
                    ) : (
                      <Redirect to="/login" />
                    )
                  } 
                />
            </Switch>
          </div>
      </Router>
    </Fragment>
  );
}

export default App;
