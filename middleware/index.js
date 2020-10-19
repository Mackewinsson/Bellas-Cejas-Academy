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

const requiresMack = (req, res, next) => {
  if (req.session && req.session.userId == "5f8db40de04b863393976831") {
    return next();
  } else {
    const err = new Error("Debes iniciar sesion como Mack");
    err.status = 401;
    return next(err);
  }
};

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.requiresMack = requiresMack;
