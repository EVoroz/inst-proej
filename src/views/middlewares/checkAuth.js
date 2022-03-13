// const { sessions } = require('../../sessions')

const checkAuth = (req, res, next) => {
  const currentUser = req.session?.user

  if (currentUser) {
    /* const sidFromUser = req.cookies.sid
  if (sessions[sidFromUser]) */
    return next()
  }

  return res.redirect('/auth/signin')
}

module.exports = {
  checkAuth,
}
