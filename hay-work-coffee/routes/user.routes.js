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


router.get('/profile/:id', (req, res, next) => {

  const { id } = req.params

  User
    .findById(id)
    .then(user => {
      res.render('user/profile', user)
    })
    .catch(err => next(err))
})

module.exports = router


