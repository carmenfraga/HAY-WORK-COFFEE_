const router = require('express').Router()
const Coffee = require('./../models/Coffee.model')

//Google Maps sharing endpoint with Coffeeshops view

router.get('/coffees', (req, res) => {

    Coffee
        .find()
        .then(coffees => res.json(coffees))
        .catch(err => res.status(500).json({ message: 'Server error', error: err }))
})


module.exports = router