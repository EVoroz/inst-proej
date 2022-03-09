//const { sessions } = require('../../sessions')

const checkAuth = (req, res, next) => {
   // const sidFromPeople = req.cookies.sid
const currentPeople = req.session?.people
   // if (sessions[sidFromPeople]) {
       if(currentPeople) {
        return next()
    }
    return res.redirect('/auth/signin')
}
module.exports = {
    checkAuth,
}