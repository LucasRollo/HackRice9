import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import '../signup.css';
import cookie from 'react-cookies';
import NavTeller from './navTeller.component';
import { promises } from 'fs';




export default class TellerSignup extends Component{
    constructor(props){
        super(props);
        // this.cashBalanceUpdate=this.cashBalanceUpdate.bind(this);
        this.onesUpdate=this.onesUpdate.bind(this);
        this.twosUpdate=this.twosUpdate.bind(this);
        this.fivesUpdate=this.fivesUpdate.bind(this);
        this.tensUpdate=this.tensUpdate.bind(this);
        this.twentiesUpdate=this.twentiesUpdate.bind(this);
        this.hundredsUpdate=this.hundredsUpdate.bind(this);
        this.rateUpdate=this.rateUpdate.bind(this);
        this.liveButtonClicked=this.liveButtonClicked.bind(this);
        this.state={
            cashBalance:0,
            ones:0,
            twos:0,
            fives:0,
            tens:0,
            twenties:0,
            hundreds:0,
            rate:0,
            on:0
        }
    }

    onesUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ones: e.target.value})
        }
    }
    twosUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({twos: e.target.value})
        }
    }
    fivesUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({fives: e.target.value})
        }
    }
    tensUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({tens: e.target.value})
        }
    }
    twentiesUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({twenties: e.target.value})
        }
    }
    hundredsUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({hundreds: e.target.value})
        }
    }
    rateUpdate(e){
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({rate: e.target.value})
        }
    }
    SelectAll(e){
        var id=e.target.attributes.getNamedItem("id").nodeValue;
        document.getElementById(id).focus();
        document.getElementById(id).select();
    }
    logLocation(){
      axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAWJfBTsAd8TQ83LdjHKj5XzgiCm92n2Ec")
        .then(res => {
          axios.post("http://localhost:5000/logLocation/"+cookie.load('user_id'), {long: res.data.location.lng, lat: res.data.location.lat})
            .catch(err => console.log(err))
        })
        .catch(err => {
          console.log(err);
        })
    }
    liveButtonClicked(e){
        const button=document.getElementsByClassName('on-button')[0]
        if(this.state.on===0){

            this.setState({cashBalance: 1*this.state.ones+2*this.state.twos+5*this.state.fives+10*this.state.tens+20*this.state.twenties+100*this.state.hundreds},()=>{
            if(this.state.cashBalance>=20){
                this.logLocation();

                this.setState({on:1});
                button.innerHTML='Go Offline';
                button.style.backgroundColor="red";

                const cash = {
                  money: this.state.cashBalance
                }
                const rate = {
                  rate: this.state.rate
                }

                axios.post("http://localhost:5000/updateCashBalance/" + cookie.load('user_id'), cash)
                  .then(resp => {
                      axios.post("http://localhost:5000/updateRate/" + cookie.load('user_id'), rate)
                        .then(resp => {
                            axios.post("http://localhost:5000/updateTeller/" + cookie.load('user_id'))
                        })
                  })
            }
            });



        } else {
            this.setState({on:0});
            button.innerHTML='Go Live';
            button.style.backgroundColor="green";

            axios.post("http://localhost:5000/updateTeller/" + cookie.load('user_id'))
        }
    }
    render(){
        return(
            <>
            <NavTeller />
            <div className='container'>
                <h1>Your Balance</h1>
            <Row>
                <h3>Ones:</h3>

                <Form.Control onChange={this.onesUpdate} onClick={this.SelectAll}className="bill-input" type="text" name='ones' id="txtfld" disabled={this.state.on} value={this.state.ones}/>
            </Row>
            <Row>
                <h3>Twos:</h3>
                <Form.Control onChange={this.twosUpdate} onClick={this.SelectAll} className="bill-input"type="text" name='twos' id="txtfld1" disabled={this.state.on} value={this.state.twos}/>
            </Row>
            <Row>
                <h3>Fives:</h3>
                <Form.Control onChange={this.fivesUpdate} onClick={this.SelectAll} className="bill-input"type="text" name='fives' id="txtfld2" disabled={this.state.on} value={this.state.fives}/>
            </Row>
            <Row>
                <h3>Tens:</h3>
                <Form.Control onChange={this.tensUpdate} onClick={this.SelectAll} className="bill-input"type="text" name='tens' id="txtfld3" disabled={this.state.on} value={this.state.tens}/>
            </Row>
            <Row>
                <h3>Twenties:</h3>
                <Form.Control onChange={this.twentiesUpdate} onClick={this.SelectAll} className="bill-input"type="text" name='twenties' id="txtfld4" disabled={this.state.on} value={this.state.twenties}/>
            </Row>
            <Row>
                <h3>Hundreds:</h3>
                <Form.Control onChange={this.hundredsUpdate} onClick={this.SelectAll} className="bill-input"type="text" name='hundreds' id="txtfld5" disabled={this.state.on} value={this.state.hundreds}/>
            </Row>
            <h1>Your Rules</h1>
            <h6>How many cents do you want to make per dollar you dispense <span>(we reccomend 1-3)</span></h6>
            <Row>
                <h3>Interest Rate:</h3>
                <Form.Control onChange={this.rateUpdate} onClick={this.SelectAll} id="rate-input"className="rate-input"type="text" name='rate' disabled={this.state.on} value={this.state.rate}/>
            </Row>
            <h1><Button onClick={this.liveButtonClicked} className="on-button on" id="off">Go Live</Button></h1>
            <h5>You must have at least $20, and set a rate to go live</h5>
            </div>
            </>
        )
    }
}
