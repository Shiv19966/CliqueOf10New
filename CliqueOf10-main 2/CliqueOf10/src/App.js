// src/App.js
import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from "./frontend/UserRegistration";
import Login from "./frontend/Login"; 
import Dashboard from "./frontend/Dashboard"; 
// 
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./config";
import ForgotPassword from "./frontend/ForgotPassword";
import BottomNavbar from "./frontend/BottomNavBar";
const App = () => {
  const [state, setState] = useState("");
  console.log(process.env.REACT_APP_API_URL, 13);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
       
        setState("Dashboard");
      } else {
        
        setState(""); 
      }
    });

    
    return () => unsubscribe();
  }, []);
  const checkState = () => {
    switch (state) {
      case "":
        return <Registration setState={setState} />;
      case "Login":
        return <Login setState={setState} />;
      case "Dashboard":
        return (
          // <div style={{ overflow: "hidden" }}>
          //   <Dashboard />
          <BottomNavbar setState={setState} state={state} />
          // </div>
        );
      case "ForgotPassword":
        return <ForgotPassword setState={setState} />;
      default:
        return <Registration setState={setState} />;
    }
  };
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/register" component={Registration} />
    //     <Route path="/login" component={Login} />
    //     <ProtectedRoute path="/dashboard" component={Dashboard} />
    //   </Switch>
    // </Router>
    <div className="App">{checkState()}</div>
  );
};

export default App;
