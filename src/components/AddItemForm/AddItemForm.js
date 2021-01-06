import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddItemForm extends Component {

    state = {
        newItem: {
            description: '',
            url: ''
        }
    }

    handleChangeFor = (event, propertyName) => {
        this.setState({
            newItem: {
                ...this.state.newItem,
                [propertyName]: event.target.value
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch({ type: 'ADD_ITEM', payload: this.state.newItem })
    }

    render() {
        return (
            <div>
                <p>This is the add item form</p>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="description" onChange={(event) => this.handleChangeFor(event, 'description')} />
                    <input placeholder="image url" onChange={(event) => this.handleChangeFor(event, 'url')} />
                    <button type="submit">Add Item</button>
                </form>
            </div>
        )
    }
}

export default connect()(AddItemForm);