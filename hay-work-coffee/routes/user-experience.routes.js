const router = require('express').Router()
const Experience = require('./../models/Experience.model')


//Create a Coffeeshop User-experience

router.post('/coffees/:id/experience', (req, res, next) => {

    const { id } = req.params
    const { description } = req.body
    const userId = req.session.currentUser._id

    console.log('LOS DATOS --->', id, description, userId)
    Experience
        .create({ description, owner: userId, coffee: id })
        .then(experience => {
            res.redirect(`/coffees/${id}`)
        })
        .catch(err => console.log(err))

})



module.exports = router