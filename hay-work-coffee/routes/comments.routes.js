const router = require('express').Router()
const Comment = require('./../models/Comment.model');

//Create Comment about a Coffeeshop User-experience 

router.post('/coffees/:coffeeId/comments/:expId', (req, res, next) => {

    const { coffeeId, expId } = req.params
    const { comments } = req.body
    const { _id } = req.session.currentUser

    Comment
        .create({ description: comments, experience: expId, owner: _id })
        .then(elem => {
            res.redirect(`/coffees/${coffeeId}`)
        })
        .catch(err => next(err))

})


module.exports = router;