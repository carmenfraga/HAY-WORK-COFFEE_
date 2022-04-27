const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model")
const saltRounds = 10;


// sign-up:

router.get("/sign-up", (req, res, next) => {
    res.render("auth/sign-up");
});

router.post("/sign-up", (req, res, next) => {

    const { username, email, plainPassword } = req.body

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(plainPassword, salt))
        .then(hashedPassword => User.create({ username, email, password: hashedPassword }))
        .then(() => res.redirect('/log-in'))
        .catch(error => next(error));

})

//log-in

router.get("/log-in", (req, res, next) => {
    res.render("auth/log-in");
});

router.post('/log-in', (req, res, next) => {

    const { email, plainPassword } = req.body

    if (email.length === 0 || plainPassword.length === 0) {

        res.render('auth/log-in', { errorMessage: 'Complete all the fields' })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.render('auth/log-in', { errorMessage: 'User not recognized' })
                return
            }
            if (!bcryptjs.compareSync(plainPassword, user.password)) {
                res.render('auth/log-in', { errorMessage: 'Password not valid' })
                return
            }
            req.session.currentUser = user
            res.redirect(`/profile`)
        })
        .catch(error => next(error));

})

//log-out

router.post('/log-out', (req, res, next) => {


    req.session.destroy(() => res.redirect('/'))

})





module.exports = router;