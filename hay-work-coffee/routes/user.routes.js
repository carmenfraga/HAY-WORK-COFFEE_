const router = require('express').Router()
const fileUploader = require("../config/cloudinary.config")
const User = require("../models/User.model")
const Coffee = require('./../models/Coffee.model')


const { isLoggedIn } = require('./../middlewares/route-guard')

// Coffeeshopers Community 
router.get('/community', isLoggedIn, (req, res, next) => {

  User
    .find()
    .then(user => {
      res.render('user/community', { user })
    })
    .catch(err => next(err))
})

//My Profile
router.get('/profile', isLoggedIn, (req, res, next) => {

<<<<<<< HEAD
router.get('/profile', (req, res, next) => {

=======
>>>>>>> 74cd5b9b3884d024095c9b7c53696815581540e4
  const { _id } = req.session.currentUser

  User
    .findById(_id)
    .then(user => {
<<<<<<< HEAD
      res.render('user/my-profile', user)
=======
      res.render('user/my-profile', { user, thisUser: true })
>>>>>>> 74cd5b9b3884d024095c9b7c53696815581540e4
    })
    .catch(err => next(err))
})

module.exports = router

//To access each Profile from Community
router.get('/users/:id', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  User
    .findById(id)
    .populate('coffee')
    .then(user => {
      res.render('user/my-profile', { user })
    })
    .catch(err => next(err))
})


// Edit My Profile

router.get('/users/:id/edit', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  User
    .findById(id)
    .then(user => {
      Coffee
        .find()
        .then(coffees => {
          res.render('user/edit-profile', { user, coffees })
        })

    })
    .catch(err => next(err))
})

router.post('/users/:id/edit', isLoggedIn, fileUploader.single('avatar'), (req, res, next) => {

  const { id } = req.params
  const { username, email, description, favCoffees } = req.body
  const { path } = req.file

  User
    .findByIdAndUpdate(id, { username, email, avatar: path, description, favCoffees })
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => next(err))
})

// Delete My Profile

router.post('/users/:id/delete', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  User
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect('/community')
    })
    .catch(err => next(err))

});

module.exports = router

