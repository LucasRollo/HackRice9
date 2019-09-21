import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import { Link } from 'react-router-dom';
import path from 'path';
import "./register.css"
export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword1 = this.onChangePassword1.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state ={
            fname:'',
            lname:'',
            username: '',
            password: '',
            phone: '',
        }
    }
    onChangeFname(e){
        this.setState({
            fname:e.target.value
        });
    }
    onChangeLname(e){
        this.setState({
            lname:e.target.value
        });
    }
    onChangeUsername(e) {
        this.setState({
            username:e.target.value
        });
        console.log('changing username');
    }
    onChangePassword1(e) {
        this.setState({
            password:e.target.value
        });
    }
    onChangePassword2(e) {
        console.log('changing password 2');
        if(this.state.password===e.target.value){
            console.log('same');
            document.getElementById('submit').setAttribute("variant","success");
            document.getElementById('submit').removeAttribute("disabled");
        } else {
            console.log('diferent');
            document.getElementById('submit').setAttribute("disabled","");
        }
    }
    onChangePhone(e){
        this.setState({
            phone:e.target.value
        });
    }
    onFormSubmit(e){
        e.preventDefault();

        const newUser={
            f_name:this.state.fname,
            l_name:this.state.lname,
            username:this.state.username,
            password:this.state.password,
            phone:this.state.phone
        }
        console.log(newUser);
        const uri="http://localhost:5000/register";
        console.log(uri);
        axios
            .post(uri,newUser)
            .then((res) => {
                console.log(res);
                window.location("/");
            })
            .catch(err => console.log(err))

    }
    render(){
        return(
            <div class="container">
            <Form onSubmit={this.onFormSubmit}>
                <h1>Register</h1>
                <Row>
                <Form.Group  className="name" controlId="f_Name">
                    <Form.Control type="text" placeholder="First Name" onChange={this.onChangeFname}/>
                </Form.Group>
                <Form.Group className="name"controlId="l_Name">
                    <Form.Control type="text" placeholder="Last Name" onChange={this.onChangeLname}/>
                </Form.Group>
                </Row>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeUsername}/>
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                    <Form.Control type="text" placeholder="Enter Phone" onChange={this.onChangePhone}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword1">
                    <Form.Control type="password" placeholder="Enter password" onChange={this.onChangePassword1}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                    <Form.Control type="password" placeholder="Re-enter password" onChange={this.onChangePassword2}/>
                </Form.Group>
                
                <Button id="submit"variant="outline-success" type="submit" disabled>
                    Submit
                </Button>
                <Link to="/login">Already Have an account? login</Link>
            </Form>
            </div>
        );
    }
    
    
}