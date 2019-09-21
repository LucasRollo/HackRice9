import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Login from './components/login.component';
import Home from './components/home.component';
import Register from './components/register.component';
import TellersList from './components/tellers-list.component';

function App() {
  return (

    <Router>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/tellers-list" exact component={TellersList}/>
      <Route path="/" exact component={Home}/>
    </Router>
  );
}

export default App;
