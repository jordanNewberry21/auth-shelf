import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SHELF'})
  }

  render() {
    return (
      <div className="container">
        <p>{JSON.stringify(this.props.store.shelf)}</p>
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <ul>
              {this.props.store.shelf.map(item => {
                return(
                <li key={item.id}>{item.description}
                <img src={item.image_url} /></li>
                )
              })}
            </ul>
          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStoreToProps)(LandingPage);
