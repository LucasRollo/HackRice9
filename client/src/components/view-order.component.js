import React, {Component} from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import Nav from './nav.component';
import { Link } from 'react-router-dom';


export default class ViewOrder extends Component{
  constructor(props) {
    super(props);

    this.completeOrder = this.completeOrder.bind(this);

    this.state = {data: []};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/lastOrder/' + cookie.load('user_id'))
      .then(response => {
        this.setState({data: response.data});
        console.log(response);
      })
  }

  completeOrder(e) {
    e.preventDefault()
    axios.post('http://localhost:5000/completeOrder/'+this.state.data[5]+'/'+cookie.load('user_id'))
      .then(resp => {
        window.location = '/'
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    return (
      <div>
        <Nav />
        <div className = "container">
          <h2>{this.state.data[0]}</h2>
          <h3>{this.state.data[1]}</h3>
          <h3>{this.state.data[2]}</h3>
          <h3>{this.state.data[3]}</h3>
          {this.state.data[4]? (<button type="button" className="btn btn-success" disabled>Success</button>) : (<button type="button" className="btn btn-success" onClick = {this.completeOrder}>Success</button>) }
          <Link to="/">back to home</Link>
        </div>
      </div>
    )
  }
}
