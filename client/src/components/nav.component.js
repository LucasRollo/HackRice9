import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import '../home.css';
import { Link } from 'react-router-dom';
import path from 'path';
import Book from '../img/icons8_handshake_52px.png';

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.state={
            bankBalance:0,
            withdrawAmmnt:0,
        }
    };
    componentDidMount(){
        var uri="localhost:5000/bankBalance";
        axios.get(uri)
        .then(res => {
            this.setState({
                bankBalance:res.data.bankBalance,
            });
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render(){
        return(
            <nav class="navbar navbar-light bg-light">
                <button class="button"><img src={Book}></img></button>
                <h3>{bankBalance}</h3>
                <button class="button"><img src={Book}></img></button>
            </nav>
        )
    }
}
