const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  // Check if user exists and password is correct
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password',
    })
  }

  // Create user object and sign a token, then return token
  const userForToken = {
    id: user._id, // _id is only replaced for id when json method is called on an User object
    username: user.username,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60, // Token expires in 1 hour
  })

  res.status(200).send({
    token: token,
    username: user.username,
    name: user.name,
  })
})

module.exports = loginRouter
