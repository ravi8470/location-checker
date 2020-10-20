const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {

  let user = await User.findOne({
    userName: req.body.userName,
    role: req.body.role,
  });
  if (user) {
    let valid = await user.verifyPassword(req.body.password);
    if (valid) {
      req.session.userName = user.userName;
      req.session.role = user.role;
      return res.redirect('/');
    }
  }
  var string = encodeURIComponent('invalid');
  res.redirect('/?auth=' + string);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.sendStatus(500);
    res.redirect('/');
  });
});


module.exports = router;