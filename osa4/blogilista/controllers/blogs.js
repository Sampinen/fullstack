const blogRouter = require('express').Router()
const { request } = require('node:http')
const jwt = require('jsonwebtoken')


const Blog = require("../models/blog.js")
const logger = require("../utils/logger.js")
const User = require('../models/user')
logger.blogs(Blog)

blogRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({})
  .find({}).populate('user',{ username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response,next) => {
  const body = request.body
  const typ = typeof request.token
  console.log("Request token:"+request.token)
  console.log("Type:"+typ)
  const token = await request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log(decodedToken)
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user
  })
  try {
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
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

blogRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
        response.status(404).send({ error: 'unknown endpoint' }).end()
      }
  const updatedContent = request.body
  try {
    blog.title = updatedContent.title || blog.title
    blog.author = updatedContent.author || blog.author
    blog.url = updatedContent.url || blog.url
    blog.likes = updatedContent.likes || blog.likes
    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter