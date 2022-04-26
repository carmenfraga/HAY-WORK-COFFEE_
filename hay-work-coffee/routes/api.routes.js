const router = require('express').Router()
const Coffee = require('./../models/Coffee.model')


router.get('/coffees', (req, res, next) => {

    Coffee
        .find()
        .then(coffees => res.json(coffees))
        .catch(err => next(err))
})


module.exports = router