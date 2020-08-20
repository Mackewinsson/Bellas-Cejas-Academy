const express = require("express");
const router = express.Router();
const fs = require("fs");
const User = require("../db/models/userSchema");

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
    res.status(200).render("index", { title: "Client500" });
  })
);

/* GET clients TESTING*/
router.get(
  "/clients",
  asyncHandler((req, res, next) => {
    let rawdata = fs.readFileSync("./resultsObject.json");
    let data = JSON.parse(rawdata);
    res.render("clients", {
      title: "Clients",
      data,
    });
  })
);

// GET registro de usuarios
router.get(
  "/registro",
  asyncHandler((req, res, next) => {
    res.status(200).render("registro", { title: "Registro" });
  })
);
// POST registro de usuarios
router.post(
  "/registro",
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
          return next(error);
        } else {
          return res.redirect("/profile");
        }
      });
    } else {
      const err = new Error("All fields required.");
      err.status = 400;
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
