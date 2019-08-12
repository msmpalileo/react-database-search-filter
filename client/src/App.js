import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Components
import Profiles from "./components/SearchProfiles";
import AddProfile from "./components/AddProfile";
import AddUser from "./components/AddUser";

//Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <div id="add-data-container" className="data-container">
          <AddUser />
          <AddProfile />
        </div>
        <div id="search-data-container" className="data-container">
          <Profiles />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
