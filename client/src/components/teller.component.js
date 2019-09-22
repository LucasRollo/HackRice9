import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../teller.css';
import { Link } from 'react-router-dom';
export default class Teller extends Component{
    constructor(props){
        super(props);
        this.onClickTeller=this.onClickTeller.bind(this);
    };
    onClickTeller(e){
        console.log(this.props.f_name);
        console.log(this.props.l_name);
        console.log(this.props.commission);
        console.log(this.props.distance);
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
                        <h4> {Math.round(this.props.distance * 100) / 100}Mi.</h4>
                    </div>
                </div>
            </div>
            <hr className="border"></hr>
            </>
        )
    }
} 
