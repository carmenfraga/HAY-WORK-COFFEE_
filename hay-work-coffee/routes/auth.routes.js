const router = require("express").Router();
router.get("/log-in", (req, res, next) => {
    res.render("auth/log-in");
});
router.get("/sign-up", (req, res, next) => {
    res.render("auth/sign-up");
});
module.exports = router;