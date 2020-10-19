const express = require("express");
const router = express.Router();
const fs = require("fs");
const User = require("../db/models/userSchema");
const mid = require("../middleware");

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/* GET home page. */

router.get(
  "/",
  asyncHandler((req, res, next) => {
    res.status(200).render("index", { title: "Bellas Cejas Academy" });
  })
);

/* GET Contacto */
router.get(
  "/ayuda",
  asyncHandler((req, res, next) => {
    res.status(200).render("ayuda", { title: "Bellas Cejas Academy" });
  })
);

// GET Perfil
router.get(
  "/perfil",
  asyncHandler((req, res, next) => {
    if (!req.session.userId) {
      const err = new Error("No estas autorizado para ver esta pagina");
      err.status = 403;
      return next(err);
    }
    User.findById(req.session.userId).exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        console.log(user.name);
        return res.render("perfil", {
          title: "Perfil",
          name: user.name,
        });
      }
    });
  })
);

// GET LOGOUT
router.get(
  "/logout",
  asyncHandler((req, res, next, err) => {
    if (req.session) {
      // delete the session
      req.session.destroy(function () {
        if (err) {
          return next(err);
        } else {
          res.redirect("/");
        }
      });
    }
  })
);
// GET LOGIN
router.get(
  "/login",
  mid.loggedOut,
  asyncHandler((req, res, next) => {
    return res.render("login", {
      title: "Log in",
    });
  })
);

// POST LOGIN
router.post(
  "/login",
  asyncHandler((req, res, next) => {
    console.log(req.body);
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (
        error,
        user
      ) {
        if (error || !user) {
          const err = new Error("Wrong emailo or password");
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = user._id;
          return res.redirect("/perfil");
        }
      });
    } else {
      const err = new Error("Email and password are required");
      err.status = 401;
      return next(err);
    }
  })
);
/* GET clients TESTING*/
router.get(
  "/curso-de-microblading",
  mid.requiresLogin,
  asyncHandler((req, res, next) => {
    let rawdata = fs.readFileSync("./resultsObject.json");
    let data = JSON.parse(rawdata);
    console.log(data);
    res.render("cursomicroblading", {
      title: "Curso de Microblading",
      data,
    });
  })
);

// GET registro de usuarios
router.get(
  "/registro",
  mid.requiresMack,
  asyncHandler((req, res, next) => {
    res.status(200).render("registro", { title: "Registro" });
  })
);
// POST registro de usuarios
router.post(
  "/registro",
  mid.requiresMack,
  asyncHandler((req, res, next) => {
    // Check if all the fields are being sent
    console.log(req.body);
    if (
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.confirmPassword
    ) {
      //
      if (req.body.password !== req.body.confirmPassword) {
        const err = new Error("Passwords do not match.");
        err.status = 400;
        console.log("err 1");
        return next(err);
      }
      // create an object with the USER data
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      // Create Schema
      User.create(userData, (error, user) => {
        if (error) {
          console.log("err 2");
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect("/perfil");
        }
      });
    } else {
      const err = new Error("All fields required.");
      err.status = 400;
      console.log("err 3");
      return next(err);
    }
  })
);

// GET constacto
// router.get(
//   "/registro",
//   asyncHandler((req, res, next) => {

//   })
// );

// GET constacto
router.get("/constacto", function (req, res, next) {
  res.render("constacto", { title: "constacto" });
});

module.exports = router;
