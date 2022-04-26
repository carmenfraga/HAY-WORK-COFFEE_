const User = require('../models/User.model')

const router = require('express').Router()

// const { isLoggedIn } = require('./../middleware/route-guard')

router.get('/profile', (req, res, next) => {

  const { _id } = req.session.currentUser

  User
    .findById(_id)
    .then(user => {
      res.render('user/profile', user)
    })
    .catch(err => next(err))
})

module.exports = router


