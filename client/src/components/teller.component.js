import React, {Component} from 'react';
// import {Form, Button} from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../teller.css';
import { Link } from 'react-router-dom';
import Miles from '../img/icons8_geo_fence_50px.png';
import Percentage from '../img/icons8_percentage_50px.png';
export default class Teller extends Component{
    render(){
        return(
            <>
            <div className="teller-container" id={"teller"+this.props.id}>
                <div className="name-sec">
                    <h4>{this.props.f_name} {this.props.l_name}</h4>
                </div>
                <div className="data-sec">
                    <div className="data-sec sub">
                        <h4>{Math.round(this.props.commission * 100) / 100}% </h4>
                        {/* <img src={Percentage}></img> */}
                    </div>
                    <div className="data-sec sub">
                        <h4> {Math.round(this.props.distance * 100) / 100}Mi.</h4>
                        {/* <img src={Miles}></img> */}
                    </div>
                </div>
            </div>
            <hr class="border"></hr>
            </>
        )
    }
} 
