const User = require('../models/User.model')

const router = require('express').Router()

// const { isLoggedIn } = require('./../middleware/route-guard')

router.get('/profile/:id', (req, res, next) => {

    const {id} = req.params
 
    User
    .findById(id)
    .then(user => {
      res.render('user/profile', user)
    })
    .catch(err => next(err))
})

module.exports = router


