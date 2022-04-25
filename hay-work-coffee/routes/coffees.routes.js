const router = require('express').Router();

const Coffee = require('./../models/Coffee.model')

router.get('/coffees/new', (req, res) => {
    Coffee
        .find()
        .then(coffees => {
            res.render('coffees/new-coffee', { coffees })
        })
        .catch(err => console.log(err))
})

// router.post('/coffees/new', (req, res) => {

//     const { name, type, latitude, longitude } = req.body

//     Place
//         .create({ name, type, location: { type: "Point", coordinates: [latitude, longitude] } })
//         .then(() => {
//             res.redirect('/places')
//         })
//         .catch(err => console.log(err))
// })


module.exports = router;