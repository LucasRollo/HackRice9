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
import Backarrow from '../img/icons8_clear_symbol_50px.png';
import Delete from '../img/icons8_delete_sign_50px.png';
import TellerList from './tellers-list.component';
import path from 'path';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.onChangeWithdraw = this.onChangeWithdraw.bind(this);
        this.oneOnClick = this.oneOnClick.bind(this);
        this.zeroOnClick = this.zeroOnClick.bind(this);
        this.twoOnClick = this.twoOnClick.bind(this);
        this.threeOnClick = this.threeOnClick.bind(this);
        this.fourOnClick = this.fourOnClick.bind(this);
        this.fiveOnClick = this.fiveOnClick.bind(this);
        this.sixOnClick = this.sixOnClick.bind(this);
        this.sevenOnClick = this.sevenOnClick.bind(this);
        this.eightOnClick = this.eightOnClick.bind(this);
        this.backArrowOnClick = this.backArrowOnClick.bind(this);
        this.nineOnClick = this.nineOnClick.bind(this);
        this.dotOnClick = this.dotOnClick.bind(this);
        this.logLocation = this.logLocation.bind(this);


        this.state ={
            withdraw: '',
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
        axios.get(`http://localhost:5000/bankBalance/${cookie.load('user_id')}`)
            .then(response => {
              console.log(response.data);
            })
    }

    oneOnClick(){
        this.setState({withdraw: this.state.withdraw+'1'});
    };
    twoOnClick(){
        this.setState({withdraw: this.state.withdraw+'2'});
    };
    threeOnClick(){
        this.setState({withdraw: this.state.withdraw+'3'});
    };
    fourOnClick(){
        this.setState({withdraw: this.state.withdraw+'4'});
    };
    fiveOnClick(){
        this.setState({withdraw: this.state.withdraw+'5'});
    };
    sixOnClick(){
        this.setState({withdraw: this.state.withdraw+'6'});
    };
    sevenOnClick(){
        this.setState({withdraw: this.state.withdraw+'7'});
    };
    eightOnClick(){
        this.setState({withdraw: this.state.withdraw+'8'});
    };
    nineOnClick(){
        this.setState({withdraw: this.state.withdraw+'9'});
    };
    backArrowOnClick(){
        this.setState({withdraw: this.state.withdraw.substring(0,this.state.withdraw.length-1)});
    };
    zeroOnClick(){
        this.setState({withdraw: this.state.withdraw+'0'});
    };
    dotOnClick(){
        this.setState({withdraw: ''});
    };
    makeTellersList() {
      
      this.setState((prevState) => ({withdraw: prevState.withdraw, element: <TellerList money={ prevState.withdraw }/>}));
    }

    logLocation(e){
      e.preventDefault()
      axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAWJfBTsAd8TQ83LdjHKj5XzgiCm92n2Ec")
        .then(res => {
          console.log(res.data.location);
          axios.post("http://localhost:5000/logLocation/"+cookie.load('user_id'), {long: res.data.location.lng, lat: res.data.location.lat})
            .then(respo => this.makeTellersList())
            .catch(err => console.log(err))
        })
        .catch(err => {
          console.log(err);
        })

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
                        <Form.Control type="text" placeholder="Withdraw amount" style={{textAlign:"center"}} onChange={this.onChangeWithdraw} value={'$'+this.state.withdraw}/>
                    </Form.Group>
                    <div className="numpad">
                        <div className="number-row">
                            <div onClick={this.oneOnClick} className="num-btn"><h1>1</h1></div>
                            <div onClick={this.twoOnClick}className="num-btn"><h1>2</h1></div>
                            <div onClick={this.threeOnClick}className="num-btn"><h1>3</h1></div>
                        </div>
                        <div className="number-row">
                            <div onClick={this.fourOnClick}className="num-btn"><h1>4</h1></div>
                            <div onClick={this.fiveOnClick}className="num-btn"><h1>5</h1></div>
                            <div onClick={this.sixOnClick}className="num-btn"><h1>6</h1></div>
                        </div>
                        <div className="number-row">
                            <div onClick={this.sevenOnClick}className="num-btn"><h1>7</h1></div>
                            <div onClick={this.eightOnClick}className="num-btn"><h1>8</h1></div>
                            <div onClick={this.nineOnClick} className="num-btn"><h1>9</h1></div>
                        </div>
                        <div className="number-row">
                            <div onClick={this.backArrowOnClick}className="num-btn"><img id="backarrow" src={Backarrow} /></div>
                            <div onClick={this.zeroOnClick}className="num-btn"><h1>0</h1></div>
                            <div onClick={this.dotOnClick}className="num-btn"><img src={Delete}/></div>
                        </div>
                    </div>
                    <button style={{margin:"auto", height: "70px"}} onClick={this.logLocation} className="button money-button"><img className="money-img"src={Money}></img></button>
                    </Form>)

                    : ( this.state.element )
                  }

                </div>
            </div>
        )
    }
}
