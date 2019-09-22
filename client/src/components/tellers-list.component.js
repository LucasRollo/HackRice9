import React, {Component} from 'react';
import axios from 'axios'
import cookie from 'react-cookies';
import Teller from './teller.component.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';


export default class TellersList extends Component{
  constructor(props) {
    super(props);

    this.state = {isLoading: true, data: []};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/nearbyTeller/' + this.props.money+'/'+cookie.load('user_id'))
      .then(response => {
        console.log(response.data)
        this.setState({isLoading: false, data: response.data})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="teller-wrapper">
     {this.state.data.map(function(teller,i){
        return <Teller f_name={teller[0]} l_name={teller[1]} commission={teller[2]} distance={teller[3]} id={i}/>;
      })}
      </div>
      )
  }

}
