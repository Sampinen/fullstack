const blogRouter = require('express').Router()
const Blog = require("../models/blog.js")
const logger = require("../utils/logger.js")

logger.blogs(Blog)

blogRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response,next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
  try {
  const blogs = await blog.save()
  response.status(201).json(blogs)
  } catch (error) {
    next(error)
  }

})

module.exports = blogRouter