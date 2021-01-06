import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddItemForm from '../AddItemForm/AddItemForm';

import addItemForm from '../AddItemForm/AddItemForm';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SHELF'})
  }

  render() {
    return(
      <div className="container">
        <h2>Info Page</h2>
        <AddItemForm />
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
        </div>
      </div>
    );
  }
}



export default connect(mapStoreToProps)(InfoPage);
