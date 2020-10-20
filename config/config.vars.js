require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  database: {
    uri: process.env.DB_URL || 'mongodb://localhost:27017/codeCloudsDB123',
  },
  server:{
    port: process.env.PORT || 5000,
  }
};

module.exports = config;