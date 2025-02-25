import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Filestack
import { PickerOverlay } from 'filestack-react';

// dotenv
const apiKey = process.env.REACT_APP_FILESTACK_API_KEY



class AddItemForm extends Component {
  state = {
    newItem: {
      description: "",
      url: "",
    },
    imageUpload: false,
  };

  handleChangeFor = (event, inputProperty) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [inputProperty]: event.target.value,
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "ADD_ITEM", payload: this.state.newItem });
    this.setState({
      newItem: {
        description: '',
      },
      imageUpload: !this.state.imageUpload
    })
  };

  onSuccess = (result) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        url: result.filesUploaded[0].url,
      }
    })
  }

  onError = (error) => {
    console.error('error', error);
  }

  upload = () => {
    this.setState({

      imageUpload: !this.state.imageUpload
    })
  }
  

  render() {
    const basicOptions = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
    }
    
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <TextField
            id="outlined-basic"
            label="description"
            variant="outlined"
            onChange={(event) => this.handleChangeFor(event, `description`)}
            style={{
              marginBottom: "10px",
              marginTop: "40px",
              backgroundColor: "white",
            }}
          />
          <br />


          {this.state.imageUpload ? 
              <PickerOverlay
                apikey={apiKey}
                buttonText="Upload Photo"
                buttonClass="ui medium button gray"
                options={basicOptions}
                onSuccess={(event) => this.onSuccess(event, 'url')}
                onError={this.onError}
              />   :
              <Button variant="contained" color="primary" onClick={this.upload}>Choose File</Button>

        }

          <Button variant="contained" color="primary" type="submit">
            Add Item
          </Button>
        </form>
      </div>
    );
  }
}

export default connect()(AddItemForm);
