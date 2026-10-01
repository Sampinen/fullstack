const blogRouter = require('express').Router()
const Blog = require("../models/blog.js")
const logger = require("../utils/logger.js")

logger.blogs(Blog)

blogRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  blog.save().then((result) => {
    response.status(201).json(result)
  }).catch(error => next(error))
})

module.exports = blogRouter