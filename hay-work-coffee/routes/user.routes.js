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

<<<<<<< HEAD
  const { id } = req.params

  User
    .findById(id)
=======
  const { _id } = req.session.currentUser

  User
    .findById(_id)
>>>>>>> 3b49993342b83bfeabb9bf23229ed27bebb7a60c
    .then(user => {
      res.render('user/profile', user)
    })
    .catch(err => next(err))
})

module.exports = router


