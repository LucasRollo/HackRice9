import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import Teller from './teller.component.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';


export default class TellersList extends Component{
  constructor(props) {
    super(props);

    this.state = {isLoading: true,url:'', data: [],money:0};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/nearbyTeller/' + this.props.money+'/'+cookie.load('user_id'))
      .then(response => {
        console.log(response.data.tellers)
        this.setState({isLoading: false, data: response.data.tellers, url: response.data.img, money:this.props.money})
      })
      .catch(error => console.log(error))
  }
  render() {
    var m=this.props.money;
    return (
      <>
      <div className="teller-wrapper">
        {this.state.data.map(function(teller,i){
            // teller[4]=this.props.money;
            return <Teller f_name={teller[0]} l_name={teller[1]} commission={teller[2]} distance={teller[3]} money={m} id={teller[4]} key={i}/>;
          })}
      </div>
      <div className="map">
        <img className="map-img"src={this.state.url}></img>
      </div>


      </>
      )
  }

}
