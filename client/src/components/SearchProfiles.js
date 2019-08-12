import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getProfiles, getUsers } from "../queries/queries";
import Downshift from "downshift";
import ProfilesList from "./ProfilesList";

let items = [];

class SearchProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <div>
        {this.addUser()}
        <h2>Search Profiles</h2>
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
            <div className="field">
              <label {...getLabelProps()}>User:</label>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(
                        item => !inputValue || item.value.includes(inputValue)
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
        <ProfilesList userID={this.state.userID} />
      </div>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "getUsers" }),
  graphql(getProfiles, { name: "getProfiles" })
)(SearchProfiles);
