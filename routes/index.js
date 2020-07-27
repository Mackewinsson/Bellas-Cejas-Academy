const express = require("express");
const router = express.Router();
const fs = require("fs");

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
// router.get("/registro", function (req, res, next) {
//   res.render("registro", { title: "Registro" });
// });

// GET contacto
// router.get("/iniciosesion", function (req, res, next) {
//   res.render("iniciosesion", { title: "Inicio sesion" });
// });

// GET contacto
router.get("/contacto", function (req, res, next) {
  res.render("contacto", { title: "Contacto" });
});

module.exports = router;
