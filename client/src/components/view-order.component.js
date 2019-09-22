import React, {Component} from 'react'
import axios from 'axios'
import cookie from 'react-cookies';

export default class ViewOrder extends Component{
  constructor(props) {
    super(props);

    this.state = {data: []};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/lastOrder/' + cookie.load('user_id'))
      .then(response => {
        this.state.data = response.data;
      })
  }
  render(){
    return (
      <div>{this.state.data}</div>
    )
  }
}
