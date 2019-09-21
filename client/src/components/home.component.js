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
import Money from '../img/icons8_money_transfer_96px.png';
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
    render(){
        return(
            <>
            <Nav/>
                <div className="container">
                
                    <Form className="form-container">
                    <Form.Group controlId="" className="withdraw-fields">
                    <h1 style={{textAlign:"center"}}> Withdraw</h1>
                        <Form.Control type="text" pattern="[0-9]" placeholder="Withdraw amount" style={{textAlign:"center"}} onChange={this.onChangeWithdraw} value={this.state.withdraw}/>
                    </Form.Group>
                    <button style={{margin:"auto", height: "70px"}} className="button money-button"><img src={Money}></img></button>
                    </Form>

                </div>
            </>
        )
    }
}