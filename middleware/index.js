const loggedOut = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect("/perfil");
  }
  return next();
};

const requiresLogin = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    const err = new Error("Debes iniciar sesion para ver esta pagina");
    err.status = 401;
    return next(err);
  }
};

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
