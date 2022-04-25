// const { post } = require("./coffees.routes");

const router = require("express").Router();




router.get("/sign-up", (req, res, next) => {
    res.render("auth/sign-up");
});

router.post("/sign-up", (req, res, next) => {
    
    console.log('The form data: ', req.body);

})






router.get("/log-in", (req, res, next) => {
    res.render("auth/log-in");
});

router.post('/')

module.exports = router;