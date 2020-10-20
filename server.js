const config = require('./config/config.vars');
const express = require("express");
const app = express();
const session = require('express-session');

const DBConnection = require("./config/db.config");
const seedData = require('./utils/seeders/seeder');
const auth = require("./middlewares/auth");
const authRouter = require('./routes/authRoutes');
const cityRouter = require('./routes/cityRoutes');
const homeRouter = require('./routes/homeRoute');
let protectedRoutes = [
  '/auth/logout',
  '/city/delete-city',
  '/city/save-city',
  '/city/check-city',
];

app.set('view engine', 'ejs');
// Middleware
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(protectedRoutes, auth);

//routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/city', cityRouter);

app.listen(config.server.port, async err => {

  if (err) {
    console.log('Error: ', err);
    process.exit(1);
  }
  try {
    await DBConnection();
    console.log('Connected to DB Successfully');
    //add user for admin and user roles
    await seedData();

  } catch (err) {
    console.log('Error', err);
    process.exit(1);
  }
  console.log('Listening on port ', config.server.port);
})
