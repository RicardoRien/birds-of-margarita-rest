module.exports = (req, res, next) => {
  // console.log('-- req session', req.session)
  // Restricting routes. You must be log in to do things!
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'You must be log in' }) 
  }
} 
