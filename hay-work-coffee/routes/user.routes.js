const router = require('express').Router()
const User = require("../models/User.model")

const { isLoggedIn } = require('./../middlewares/route-guard')

// Community endpoint
router.get('/community', isLoggedIn, (req, res, next) => {

  User
    .find()
    .then(user => {
      res.render('user/community', { user })
    })
    .catch(err => next(err))
})


router.get('/profile', (req, res, next) => {

  const { _id } = req.session.currentUser

  User
    .findById(_id)
    .then(user => {
      res.render('user/my-profile', user)
    })
    .catch(err => next(err))
})

module.exports = router


