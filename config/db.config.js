const mongoose = require("mongoose");
const config = require('./config.vars');

const DBConnection = () =>  mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = DBConnection;