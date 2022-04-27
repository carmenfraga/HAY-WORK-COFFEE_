const router = require('express').Router()
const Comment = require('./../models/Comment.model');

// comentario sobre experiencia(comentario de cafetería) del usuario


router.post('/coffees/:coffeeId/comments/:expId', (req, res, next) => {

    const { coffeeId, expId } = req.params  //ide de la experiencia
    const { comments } = req.body
    const { _id } = req.session.currentUser

    // console.log('COSITAS ---->', coffeeId, expId, comments, _id)

    Comment
        .create({ description: comments, experience: expId, owner: _id })
        .then(elem => {
            res.redirect(`/coffees/${coffeeId}`)
        })
        .catch(err => next(err))

})

module.exports = router;