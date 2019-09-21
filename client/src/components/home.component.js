import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import Nav from "./nav.component";
import '../home.css';
import { Link } from 'react-router-dom';
import path from 'path';

export default class Home extends Component{
    render(){
        return(
            <>
            <Nav/>
            <div>Hi</div>
            </>
        )
    }
}