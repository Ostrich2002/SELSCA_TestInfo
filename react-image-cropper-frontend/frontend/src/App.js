import React from 'react';
import './App.css';
import Upload from "./components/uploadpage/Upload"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Home from "./components/homepage/homepage"
import {
  BrowserRouter as Router, 
  Routes, 
  Route

} from "react-router-dom";

import {useState} from 'react';
function App() {
  const [user,setLoginUser] = useState({

  })
  return (
    <div className="App">
      <Router>
<Routes>
  <Route exact path="/" element={user && user._id ? <Home/>:<Login setLoginUser={setLoginUser} />}/>
  <Route path="/login" element={<Login setLoginUser={setLoginUser}/>} />
  <Route path="/Register"element={<Register/>}/>
  <Route path="/upload" element={<Upload/>}/>
  <Route path="/home" element={<Home/>}/>
  
</Routes>
      </Router>

    </div>
  );
}

export default App;