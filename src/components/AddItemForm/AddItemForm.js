import React, { Component } from 'react'

class AddItemForm extends Component {

    state = {
        newItem: {
            description: '',
            url: ''
        }
    }

    render() {
        return (
            <div>
                <p>This is the add item form</p>
                <form>
                    <input placeholder="description" onChange={this.handleChangeFor()} />
                </form>
            </div>
        )
    }
}

export default AddItemForm