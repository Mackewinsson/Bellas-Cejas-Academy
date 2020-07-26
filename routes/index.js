var express = require("express");
var router = express.Router();
const { data } = require("../data/resultsObject.json");

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
router.get("/", function (req, res, next) {
  res.render("index", { title: "Client500" });
});

/* GET clients TESTING*/
router.get("/clients", function (req, res, next) {
  res.render("clients", {
    title: "Client500",
    data,
  });
});

// GET registro de usuarios
router.get("/registro", function (req, res, next) {
  res.render("registro", { title: "Registro" });
});

// GET contacto
router.get("/iniciosesion", function (req, res, next) {
  res.render("iniciosesion", { title: "Inicio sesion" });
});

// GET contacto
router.get("/contacto", function (req, res, next) {
  res.render("contacto", { title: "Contacto" });
});

module.exports = router;
