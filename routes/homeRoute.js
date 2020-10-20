const express = require('express');
const City = require('../models/City');
const router = express.Router();

router.get('', async (req, res) => {
  let ejsOptions = {
    isLoggedIn: null,
    userName: null,
    role: null,
    invalidAuth: null,
    city: null,
    noCity: null,
  }
  if (req.session.userName) {
    let options = {
      isLoggedIn: true,
      userName: req.session.userName,
      role: req.session.role,
    }
    if (req.session.role === 'admin') {
      let city = await City.findOne().lean();
      city && (options.city = city.name);
      return res.render('pages/index', { ...ejsOptions, ...options });
    }
    if (req.query.noCity) {
      options.noCity = true;
    }
    return res.render('pages/index', { ...ejsOptions, ...options });
  }
  let options = {
    isLoggedIn: false,
  }
  if (req.query.auth) {
    options.invalidAuth = true;
  }
  return res.render('pages/index', { ...ejsOptions, ...options });
});


module.exports = router;