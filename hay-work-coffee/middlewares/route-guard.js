const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/log-in', { errorMessage: 'Log In to Access' })
}

// const checkRole = (...rolesToCheck) => (req, res, next) => {
//     if (rolesToCheck.includes(req.session.currentUser.role)) {
//         next()
//     } else {
//         res.render('auth/log-in', { errorMessage: 'You do not have permissions' })
//     }
// }


module.exports = { isLoggedIn }




