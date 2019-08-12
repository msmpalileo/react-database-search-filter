import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import Downshift from "downshift";
import { getUsers, addProfiles, getProfiles } from "../queries/queries";

let items = [];

class AddProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      city: "",
      state: "",
      zip: "",
      rent: "",
      userID: ""
    };
  }

  addUser = () => {
    let data = this.props.getUsers;
    if (!data.loading) {
      items = data.users.map(user => {
        return { value: user.firstName + " " + user.lastName, id: user.id };
      });
    }
  };

  submitForm() {
    this.props.addProfiles({
      variables: {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        rent: this.state.rent,
        userID: this.state.userID
      },
      refetchQueries: [{ query: getProfiles }]
    });
  }

  render() {
    return (
      <div id="add-profile" className="add-data">
        {this.addUser()}
        <form onSubmit={this.submitForm.bind(this)}>
          <h2>Add Profile</h2>
          <Downshift
            onChange={selection => {
              this.setState({ userID: selection.id });
            }}
            itemToString={item => (item ? item.value : "")}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem
            }) => (
              <div>
                <label {...getLabelProps()}>User:</label>
                <input {...getInputProps()} />
                <ul {...getMenuProps()}>
                  {isOpen
                    ? items
                        .filter(
                          item =>
                            !inputValue ||
                            item.value
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .map((item, index) => (
                          <li
                            className="user-input"
                            {...getItemProps({
                              key: item.id,
                              index,
                              item
                            })}
                          >
                            {item.value}
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
          <div className="field">
            <label>ID:</label>
            <input
              type="text"
              disabled
              value={this.state.userID}
              onChange={e => this.setState({ userID: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Street:</label>
            <input
              type="text"
              onChange={e => this.setState({ street: e.target.value })}
            />
          </div>
          <div className="field">
            <label>City:</label>
            <input
              type="text"
              onChange={e => this.setState({ city: e.target.value })}
            />
          </div>
          <div className="field">
            <label>State:</label>
            <input
              type="text"
              onChange={e => this.setState({ state: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Zip:</label>
            <input
              type="text"
              onChange={e => this.setState({ zip: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Rent:</label>
            <input
              type="number"
              min="1"
              onChange={e => this.setState({ rent: parseInt(e.target.value) })}
            />
          </div>
          <div className="button">
            <button>Add Profile</button>
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "getUsers" }),
  graphql(addProfiles, { name: "addProfiles" })
)(AddProfile);
