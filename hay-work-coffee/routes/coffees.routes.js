const router = require('express').Router()
const fileUploader = require("../config/cloudinary.config")
const Coffee = require('./../models/Coffee.model')
const Experience = require('./../models/Experience.model')
const Comment = require('./../models/Comment.model')

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')

//Render New Coffeeshop Form

router.get('/coffees/new', (req, res, next) => {
    res.render('coffees/new-coffee')
})

//Create New Coffeeshop Form

router.post('/coffees/new', fileUploader.single('coffeeImage'), (req, res, next) => {

    const { name, address, latitude, longitude } = req.body
    const { path } = req.file

    Coffee
        .create({ name, image: path, address: { address, location: { type: "Point", coordinates: [latitude, longitude] } } })
        .then(() => {
            res.redirect('/coffees')
        })
        .catch(err => next(err))
})

//Render All Coffeeshops 

router.get('/coffees', (req, res, next) => {

    Coffee
        .find()
        .select('name image')
        .then(coffees => {
            res.render('coffees/coffees', { coffees })
        })
        .catch(err => next(err))
});

//Coffeeshop Details

router.get('/coffees/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const promise1 = Coffee.findById(id)
    const promise2 = Experience.find({ coffee: id }).populate('owner')

    const promises = [promise1, promise2]

    const viewInfo = {}
    const isAdmin = req.session.currentUser.role === 'ADMIN'

    Promise
        .all(promises)
        .then(([coffeeRes, experiencesRes]) => {

            const comments = experiencesRes.map(eachExperience => Comment.find({ experience: eachExperience._id }))

            viewInfo.coffeeInfo = coffeeRes
            viewInfo.experiences = experiencesRes

            return Promise.all(comments)
        })
        .then(allComments => {

            viewInfo.experiences = viewInfo.experiences.map((eachExperience, idx) => {
                return { ...eachExperience._doc, comments: allComments[idx] }
            })

            res.render('coffees/coffee-details', { viewInfo, isAdmin })
        })
        .catch(err => next(err))
})

//Delete a Coffeeshop (only ADMIN can do it)

router.post('/coffees/:id/delete', checkRole('ADMIN'), (req, res, next) => {

    const { id } = req.params

    Coffee
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/coffees')
        })
        .catch(err => next(err))

})

//Edit a Coffeeshop (only ADMIN can do it)

router.get('/coffees/:id/edit', checkRole('ADMIN'), (req, res, next) => {

    const { id } = req.params

    Coffee
        .findById(id)
        .then(coffees => {
            res.render('coffees/edit-coffee', { coffees })
        })
        .catch(err => next(err))
})


router.post('/coffees/:id/edit', fileUploader.single('coffeeImage'), (req, res, next) => {

    const { id } = req.params
    const { name, address, latitude, longitude } = req.body
    const { path } = req.file

    Coffee
        .findByIdAndUpdate(id, { name, image: path, address: { address, location: { type: "Point", coordinates: [latitude, longitude] } } })
        .then(() => {
            res.redirect('/coffees')
        })
        .catch(err => next(err))
})


module.exports = router;