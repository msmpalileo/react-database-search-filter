import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getProfiles, getUsers } from "../queries/queries";
import Downshift from "downshift";
import ProfilesList from "./ProfilesList";

let items = [];
let tempID = "";

class SearchProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      display: "displayNone"
    };
  }

  sendID = () => {
    this.setState({ userID: tempID, display: "" });
  };

  addUser = () => {
    let data = this.props.getUsers;
    if (!data.loading) {
      items = data.users.map(user => {
        return { value: user.firstName + " " + user.lastName, id: user.id };
      });
    }
  };

  render() {
    return (
      <div>
        {this.addUser()}
        <h2>Search Profiles</h2>
        <Downshift
          onChange={selection => {
            tempID = selection.id;
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
            <div className="field">
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
        <div className="button">
          <button onClick={this.sendID}>Search</button>
        </div>
        <div className={this.state.display}>
          <ProfilesList userID={this.state.userID} />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "getUsers" }),
  graphql(getProfiles, { name: "getProfiles" })
)(SearchProfiles);
