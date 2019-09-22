import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import cookie from 'react-cookies';
import axios from "axios";
import Nav from "./nav.component";
import '../home.css';
import { Link } from 'react-router-dom';
import Money from '../img/icons8_money_transfer_96px.png';
import TellerList from './tellers-list.component';
import path from 'path';

export default class Home extends Component{
    constructor(props){
        super(props);

        this.onChangeWithdraw = this.onChangeWithdraw.bind(this);
        this.logLocation = this.logLocation.bind(this);


        this.state ={
            withdraw: 0,
            element: false
        }
    };
    componentWillMount() {
      if(!cookie.load('user_id'))
        window.location = '/login';
    }
    onChangeWithdraw(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({withdraw: e.target.value, element: false})
        }
    }

    logLocation(e){
      e.preventDefault()
      axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAWJfBTsAd8TQ83LdjHKj5XzgiCm92n2Ec")
        .then(res => {
          axios.post("http://localhost:5000/logLocation/"+cookie.load('user_id'), {long: res.data.location.lng, lat: res.data.location.lat})
            .catch(err => console.log(err))
        })
        .catch(err => {
          console.log(err);
        })

      this.setState((prevState) => ({withdraw: prevState.withdraw, element: <TellerList money={ prevState.withdraw }/>}));
    }

    render(){
        return(
            <div>
              <Nav/>
                <div className="container">
                    { !this.state.element ? (
                    <Form className="form-container">
                    <Form.Group controlId="" className="withdraw-fields">
                    <h1 style={{textAlign:"center"}}> Withdraw</h1>
                        <Form.Control type="text" placeholder="Withdraw amount" style={{textAlign:"center"}} onChange={this.onChangeWithdraw} value={this.state.withdraw}/>
                    </Form.Group>
                    <button style={{margin:"auto", height: "70px"}} onClick={this.logLocation} className="button money-button"><img className="money-img"src={Money}></img></button>
                    </Form>)

                    : ( this.state.element )
                  }

                </div>
            </div>
        )
    }
}
