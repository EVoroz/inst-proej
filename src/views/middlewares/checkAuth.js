//const { sessions } = require('../../sessions')

const checkAuth = (req, res, next) => {
    const sidFromPeople = req.cookies.sid

    if (sessions[sidFromPeople]) {
        return next()
    }
    return res.redirect('/auth/sidnin')
}
module.exports = {
    checkAuth,
}