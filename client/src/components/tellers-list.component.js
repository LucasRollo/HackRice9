import React, {Component} from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';


export default class TellersList extends Component{
  constructor(props) {
    super(props);

    this.state = {isLoading: true, data: []};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/nearbyTeller/' + this.props.money)
      .then(response => {
        this.setState({isLoading: false, data: response})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (this.state.data)
  }

}
