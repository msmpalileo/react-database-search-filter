import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProfiles } from "../queries/queries";

class ProfilesList extends Component {
  displayProfilesList() {
    const { profiles } = this.props.data;
    if (profiles) {
      return (
        <div>
          {profiles.map(item => {
            return (
              <ul>
                <li>ID: {item.userID}</li>
                <li>Street: {item.street}</li>
                <li>City: {item.city}</li>
                <li>State: {item.state}</li>
                <li>Zip: {item.zip}</li>
                <li>Rent: {item.rent}</li>
              </ul>
            );
          })}
        </div>
      );
    } else {
      return <div className="loader"></div>;
    }
  }

  render() {
    console.log(this.props);
    return <div id="profile-list">{this.displayProfilesList()}</div>;
  }
}

export default graphql(getProfiles, {
  options: props => {
    return {
      variables: {
        userID: props.userID
      }
    };
  }
})(ProfilesList);