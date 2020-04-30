
const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');

const graphqlHTTP = require('express-graphql');
const schema = require('./components/race/raceGraphql');
const app = express();

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) console.log(err);
})


app
  .use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))
  .listen(PORT, () => console.log(`Listen port on ${PORT}`));
  


