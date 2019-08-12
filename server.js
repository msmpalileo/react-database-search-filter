const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Allow Cross-origin Requests
app.use(cors());

mongoose.connect(
  "mongodb+srv://msmpalileo:msmpalileo@cluster0-2he8u.mongodb.net/test"
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
