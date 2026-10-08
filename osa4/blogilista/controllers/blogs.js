const blogRouter = require('express').Router()
const { request } = require('node:http')
const Blog = require("../models/blog.js")
const logger = require("../utils/logger.js")
const { findById } = require('../../../osa3/puhelinluettelot_backend/models/person.js')

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

blogRouter.delete('/:id',async (request,response,next)=> {
  const requestID = request.params.id
  if (requestID.length!=24) {
    return response.status(400).send({ error: 'malformatted id' })
  }
  const blog = await Blog.findById(requestID)
  if (blog) {
    await Blog.deleteOne(blog)
    response.status(204).end()
  } else {
    return response.status(404).send({ error: 'Content Not Found' })
  }
})

module.exports = blogRouter