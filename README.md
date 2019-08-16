# react-database-search-filter
React App: Database Search Filter
(React, MongoDB, GraphQL, Apollo)

How to run:
1. Have NodeJS installed.
2. Open the directory, and enter "npm run dev" on the console.
  - That should start the server and the client simultaneously.
3. A Localhost:3000 tab should automatically popup in your browser after a few seconds.

App:
1. Add User
  - To add a user, a first name and last name input is provided.
  - Press "Add User" button to add the user to the database.
  - Note: You cannot add a user if one of the inputs is blank.
2. Add Profile
  - To add a profile, at least one user should have already been created.
    This provides the userID of the profile that dictates the relationship of the user to the profile.
    A list of users is provided below the "User" input if there are any present in the database.
  - Press "Add Profile" button to add the profile to the database.
  - Note: You cannot add a profile if one of the inputs is blank.
3. Search a Profile
  - To search a profile, a "User" input is needed. Type in the name of the desired user.
    If the input matches any of the users present in the database, a list of the users that match will be provided below.
  - Press "Search" and a list of the user's profiles will be listed below.
    If a user hasn't any profiles yet, the list will display "No profiles yet for this user".
