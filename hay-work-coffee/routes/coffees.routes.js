const router = require('express').Router();

const Coffee = require('./../models/Coffee.model')

router.get('/coffees/new', (req, res, next) => {
    Coffee
        .find()
        .then(coffees => {
            res.render('coffees/new-coffee', { coffees })
        })
        .catch(err => next(err))
})

router.post('/coffees/new', (req, res, next) => {

    const { name, image, city, country, address, latitude, longitude } = req.body

    Coffee
        .create({ name, image, address: { city, country, address, location: { type: "Point", coordinates: [latitude, longitude] } } })
        .then(() => {
            res.redirect('/coffees')
        })
        .catch(err => next(err))
})

router.get('/coffees', (req, res, next) => {
    Coffee
        .find()
        .then(coffees => {
            res.render('coffees/coffees', { coffees })
        })
        .catch(err => next(err))
});

router.get('/coffees/:id', (req, res, next) => {

    const { id } = req.params

    Coffee
        .findById(id)
        .then(coffee => {
            res.render('coffees/coffee-details', coffee)
        })
        .catch(err => next(err))
})

router.post('/coffees/:id/delete', (req, res, next) => {

    const { id } = req.params

    Coffee
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/coffees')
        })
        .catch(err => next(err))

});

router.get('/coffees/:id/edit', (req, res, next) => {

    const { id } = req.params

    Coffee
        .findById(id)
        .then(coffees => {
            res.render('coffees/edit-coffee', { coffees })
        })
        .catch(err => next(err))
})

router.post('/coffees/:id/edit', (req, res, next) => {

    const { id } = req.params
    const { name, image, city, country, address, latitude, longitude } = req.body

    Coffee
        .findByIdAndUpdate(id, { name, image, address: { city, country, address, location: { type: "Point", coordinates: [latitude, longitude] } } })
        .then(() => {
            res.redirect('/coffees')
        })
        .catch(err => next(err))
})

module.exports = router;