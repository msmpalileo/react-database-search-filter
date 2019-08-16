import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getProfiles } from "../queries/queries";

class ProfilesList extends Component {
  displayProfilesList() {
    const { profiles } = this.props.data;

    Object.size = function(obj) {
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    // Get the size of an object
    var size = Object.size(profiles);

    if (size > 0) {
      return (
        <div className="profileList-container">
          {profiles.map(item => {
            return (
              <ul className="profileList">
                <li>ID: {item.id}</li>
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
    }
    // else if (profiles.length() === 0) {
    //   return (
    // <div>
    //   <p>No profiles yet for this user.</p>
    // </div>
    //   );
    // }
    else {
      return (
        <div className="noProfile">
          <p>No profiles yet for this user.</p>
        </div>
      );
    }
  }

  render() {
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
