import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddItemForm extends Component {
  state = {
    newItem: {
      description: "",
      url: "",
    },
  };

  handleChangeFor = (event, propertyName) => {
    this.setState({
      newItem: {
        ...this.state.newItem,
        [propertyName]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "ADD_ITEM", payload: this.state.newItem });
  };

  render() {
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

          <TextField
            id="outlined-basic"
            label="image url"
            variant="outlined"
            onChange={(event) => this.handleChangeFor(event, `url`)}
            style={{ marginBottom: "10px", backgroundColor: "white" }}
          />
          <br />

          <Button variant="contained" color="primary" type="submit">
            Add Item
          </Button>
        </form>
      </div>
    );
  }
}

export default connect()(AddItemForm);
