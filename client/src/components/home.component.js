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
    constructor(props){
        super(props);

        this.onChangeWithdraw = this.onChangeWithdraw.bind(this);

        this.state ={
            withdraw: 0
        }
    };
    onChangeWithdraw(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        console.log('changing');
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({withdraw: e.target.value})
        }
    }
    isNumberKey(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if(charCode>31 && (charCode<48||charCode>57))
            return false;
        return true;
    }
    render(){
        return(
            <>
            <Nav/>
                <div className="container">
                    <Form>
                    <Form.Group controlId="">
                        <input type="text" pattern="[0-9]" placeholder="Withdraw amount" onkeypress="return isNumberKey(event)" onChange={this.onChangeWithdraw}/>
                    </Form.Group>
                    </Form>
                 Hi
                </div>
            </>
        )
    }
}