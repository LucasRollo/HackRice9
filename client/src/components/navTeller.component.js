import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import '../home.css';
import cookie from 'react-cookies'
import { Link } from 'react-router-dom';
import path from 'path';
import Back from '../img/icons8_back_52px.png';
import Hands from '../img/icons8_handshake_52px.png';

export default class NavTeller extends Component{

    constructor(props){
        super(props);
        // this.componentDidMount=this.componentDidMount.bind(this);
        this.backOnClick=this.backOnClick.bind(this);
        this.state={
            // bankBalance:0,
            // withdrawAmmnt:0,
        }
    };

    backOnClick(){
        window.location=('/');
    }

    render(){
        return(
            <nav className="navbar navbar-light bg-light">
                <button onClick={this.backOnClick} id="back" className="button"><img src={Back}></img></button>
                <h3></h3>
                <h3></h3>
            </nav>
        )
    }
}
