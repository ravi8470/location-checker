let ejsOptions = {
  isLoggedIn: null,
  userName: null,
  role: null,
  invalidAuth: null,
  city: null,
  noCity: null,
}

const auth = function (req, res, next) {
  if (req.session && req.session.userName)
    return next();
  else
    return res.render('pages/index', ejsOptions);
};

module.exports = auth;
