import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import "./register.css"
export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword1 = this.onChangePassword1.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        this.state ={
            fname:'',
            lname:'',
            username: '',
            password: ''
        }
    }
    onChangeFname(e){

    }
    onChangeLname(e){

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
        })
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
    onFormSubmit(e){
        e.preventDefault();

        const newUser={
            fname:this.state.fname,
            lname:this.state.lname,
            username:this.state.username,
            password:this.state.password
        }
        console.log(newUser);
    }
    render(){
        return(
            <Form onSubmit={this.onFormSubmit}>
                <h1>Register</h1>
                <Row>
                <Form.Group  className="name" controlId="f_Name" width="25%">
                    <Form.Control type="text" placeholder="First Name" onChange={this.onChangeFname}/>
                </Form.Group>
                <Form.Group className="name"controlId="l_Name">
                    <Form.Control type="text" placeholder="Last Name" onChange={this.onChangeLname}/>
                </Form.Group>
                </Row>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeUsername}/>
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
        );
    }
    
    
}