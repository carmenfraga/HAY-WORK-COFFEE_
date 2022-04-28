const router = require("express").Router();

//Home & About views

router.get("/", (req, res, next) => {
  res.render("home")
})

router.get("/about", (req, res, next) => {
  res.render("about")
})

module.exports = router