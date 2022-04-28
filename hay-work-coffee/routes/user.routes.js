const router = require('express').Router()
const fileUploader = require("../config/cloudinary.config")
const User = require("../models/User.model")
const Coffee = require('./../models/Coffee.model')


const { isLoggedIn } = require('./../middlewares/route-guard')

// Coffeeshoppers Community 

router.get('/community', isLoggedIn, (req, res, next) => {

  User
    .find()
    .select('username avatar')
    .then(user => {
      res.render('user/community', { user })
    })
    .catch(err => next(err))
})

//My Profile

router.get('/profile', isLoggedIn, (req, res, next) => {

  const { _id } = req.session.currentUser

  User
    .findById(_id)
    .populate('favCoffees')
    .then(user => {
      res.render('user/my-profile', { user, thisUser: true })
    })
    .catch(err => next(err))
})

//To access to each Profile from Community

router.get('/users/:id', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  User
    .findById(id)
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
      res.render('user/edit-profile', user)
    })
    .catch(err => next(err))
})

router.post('/users/:id/edit', isLoggedIn, fileUploader.single('avatar'), (req, res, next) => {

  const { id } = req.params
  const { username, email, description } = req.body
  const { path } = req.file

  User
    .findByIdAndUpdate(id, { username, email, avatar: path, description })
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

//Add to My Favorite Coffeeshops

router.post('/users/:id/add-to-fav', isLoggedIn, (req, res, next) => {

  const { id } = req.params
  const thisUser = req.session.currentUser._id

  User
    .findByIdAndUpdate(thisUser, { $addToSet: { favCoffees: id } })
    .then(() => {
      res.redirect('/coffees')
    })
    .catch(err => next(err))

});

//Remove from My Favorite Coffeeshops

router.post('/users/:id/remove-fav', isLoggedIn, (req, res, next) => {

  const { id } = req.params
  const thisUser = req.session.currentUser._id

  User
    .findByIdAndUpdate(thisUser, { $pull: { favCoffees: id } })
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => next(err))
})


module.exports = router



