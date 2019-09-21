import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Login from './components/login.component';
import Home from './components/home.component';
import Register from './components/register.component';
import TellerSignup from './components/tellerSignup.component';
function App() {
  return (

    <Router>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/" exact component={Home}/>
      <Route path="/tellerSignup" exact component={TellerSignup}/>
    </Router>
  );
}

export default App;
