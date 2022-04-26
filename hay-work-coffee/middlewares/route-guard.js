const isLoggedIn = (req, res, next) => {
    console.log('---VAMOS A COMPROBAR LA SESIÓN---->', req.session)
    !req.session.currentUser ? res.render('auth/log-in', { errorMessage: 'Log in to access' }) : next()
}

const isLoggedOut = (req, res, next) => {
    req.session.currentUser ? res.redirect('/my-profile') : next()
}


// const checkRole = (...rolesToCheck) => (req, res, next) => {
//     if (rolesToCheck.includes(req.session.currentUser.role)) {
//         next()
//     } else {
//         res.render('auth/log-in', { errorMessage: 'No tienes permisos' })
//     }
// }

module.exports = { isLoggedIn, isLoggedOut }