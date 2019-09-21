import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
        }
        console.log(login);
    }
    render(){
        return(
            <Form onSubmit={this.onFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeUsername}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
                <br></br>
                <Link to="/register">Dont have an account. Create One</Link>
            </Form>
        )
    }
}