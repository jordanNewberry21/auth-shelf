import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddItemForm from '../AddItemForm/AddItemForm';

import './InfoPage.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_SHELF' })
  }

  state = {
    description: '',
    editable: false
  }

  deleteItem = (event, itemId, userId) => {
    if (itemId === userId) {
      this.props.dispatch({ type: 'DELETE_ITEM', payload: { itemId: itemId, userId: userId } })
    } else {
      alert ('Bad Touch!')
    }
  }

  editItem = (event, itemId, userId) => {
    if (itemId === userId) {
      this.props.dispatch({ type: 'EDIT_ITEM', payload: { itemId: itemId, userId: userId, state: this.state } })
      this.setState({
        editable: !this.state.editable
      }) 
    } else {
      alert('Bad Touch!')
    }
  }

  canEdit = (event, itemId, userId) => {
    if (itemId === userId) {
      this.setState({
        editable: !this.state.editable
      })    
    } else {
      alert('Bad Touch!')
    }
  }

  handleChange = (event, inputProperty) => {
    this.setState({
      ...this.state,
      [inputProperty]: event.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Info Page</h2>
        <AddItemForm />
        <div className="grid">
          <div >
            <div className="flex">
              {this.props.store.shelf.map(item => {
                return (
                  <div className="margin" data={item.user_id} key={item.id}>
                    {item.description}
                    <br />
                    <img src={item.image_url} alt={item.description} />
                    <br /><br />
                    {this.state.editable ?
                      <>
                        <input placeholder='description' onChange={(event) => this.handleChange(event, 'description')} />
                        <button onClick={(event) => this.editItem(event, item.id, item.user_id)}>Save</button>
                        <button onClick={(event) => this.canEdit(event, item.id, item.user_id)}>Cancel</button>
                      </> :
                      <>
                        <button onClick={(event) => this.deleteItem(event, item.id, item.user_id)}>Delete Item</button>
                        <button onClick={(event) => this.canEdit(event, item.id, item.user_id)} >Edit Item</button>
                      </>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default connect(mapStoreToProps)(InfoPage);
