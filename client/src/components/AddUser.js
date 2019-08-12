import React, { Component } from "react";
import { addUsers, getUsers } from "../queries/queries";
import { graphql, compose } from "react-apollo";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: ""
    };
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addUsers({
      variables: {
        firstName: this.state.firstName,
        lastName: this.state.lastName
      },
      refetchQueries: [{ query: getUsers }]
    });
  }

  render() {
    return (
      <div id="add-user" className="add-data">
        <h2>Add User</h2>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label>First Name:</label>
            <input
              type="text"
              onChange={e => this.setState({ firstName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Last Name:</label>
            <input
              type="text"
              onChange={e => this.setState({ lastName: e.target.value })}
            />
          </div>
          <div className="button">
            <button>Add User</button>
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "getUsers" }),
  graphql(addUsers, { name: "addUsers" })
)(AddUser);
