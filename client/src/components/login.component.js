import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import path from 'path';
import { Link } from 'react-router-dom';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state ={
            username: '',
            password: ''
        }
    }
    onChangeUsername(e) {
        this.setState({
            username:e.target.value
        });
        console.log('changing username');
    }
    onChangePassword(e) {
        this.setState({
            password:e.target.value
        })
    }
    onFormSubmit(e){
        e.preventDefault();

        const login={
            username:this.state.username,
            password:this.state.password
        };
        console.log(login);
        const uri="http://localhost:5000/login"
        console.log(uri);
        axios.post(uri,login)
            .then(res => {
                console.log(res);
                if(res.data.status==="Success"){
                    document.cookie=`user_id=${res.data.user_id}`;
                    window.location=("/");
                }
            })
            .catch(err => {
                console.log(err)
                document.getElementById("alert").style.display='block';
            })
    }
    render(){
        return(
            <div className="container spaceContainer">
            <Form onSubmit={this.onFormSubmit}>
            <br></br>
            <h1>Login</h1>
            <br></br>
            <br></br>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeUsername}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword}/>
                </Form.Group>
                <br></br>
                <h1 style={{marginBottom: "none"}}><Button variant="success" type="submit">
                    Submit
                </Button></h1>
                <h6 style={{textAlign: "center"}} ><Link to="/register">Dont have an account. Create One</Link></h6>
                <h6 id="alert" style={{display: 'none',color:'red'}}>Incorrect Username and password</h6>
            </Form>
            </div>
        )
    }
}
