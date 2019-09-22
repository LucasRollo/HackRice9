import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../teller.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
export default class Teller extends Component{
    constructor(props){
        super(props);
        this.onClickTeller=this.onClickTeller.bind(this);
    };
    onClickTeller(e){
        // console.log(this.props.f_name);
        // console.log(this.props.l_name);
        // console.log(this.props.commission);
        // console.log(this.props.money)
        // console.log(this.props.distance);
        // console.log(this.props.id)
        const order = {
          sender: this.props.id,
          amount: ((this.props.commission/100+1)*this.props.money),
          rate: this.props.commission
        }
        axios.post('http://localhost:5000/addOrder/'+cookie.load('user_id'), order)
          .then(response => {
            console.log(response);
            window.location = '/view-order'
          })
          .catch(err => {
            console.log(err);
          })
    }

    render(){
        return(
            <>
            <div className="teller-container" id={"teller"+this.props.id} onClick={this.onClickTeller} >
                <div className="name-sec">
                    <h4>{this.props.f_name} {this.props.l_name}</h4>
                </div>
                <div className="data-sec">
                    <div className="data-sec sub">
                        <h4>${(this.props.commission/100+1)*this.props.money}|| </h4>
                    </div>
                    <div className="data-sec sub">
                        <h4> {Math.round((this.props.distance / 7.44) * 100) / 100}Mi.</h4>
                    </div>
                </div>
            </div>
            <hr className="border"></hr>
            </>
        )
    }
}
