import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from './components/Loginpage';
import Dashboard from "./components/Dashboard";
import Tenants from "./components/Tenants";
import Properties from "./components/Properties";



function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element ={<LoginPage/>} />
          <Route path="/dashboard" element ={<Dashboard/>} />
          <Route path="/tenants" element={<Tenants/>}/>
          <Route path="/properties" element={<Properties/>}/>
        </Routes>
      </Router>
  );
}

export default App;
