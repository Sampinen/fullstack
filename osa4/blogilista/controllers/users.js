const userRouter = require('express').Router()
const { request } = require('node:http')
const User = require("../models/user.js")
const logger = require("../utils/logger.js")
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response,next) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const content = request.body
  if (content.password.length >3){
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(content.password, saltRounds)

  const user = new User({
    username: content.username,
    name:content.name,
    passwordHash: passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
} else{
  response.status(400).send({ error: 'Password should be minimum of 3 characters' })
}
})


module.exports = userRouter