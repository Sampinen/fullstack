const Blog = require('../models/blog')

const initialBlogs = [
  {
  title: "Banaani",
  author: "Wikipedia",
  url: "https://fi.wikipedia.org/wiki/Banaani",
  likes: 5
  },
  {
  title: "Tomaatti",
  author: "Wikipedia",
  url: "https://fi.wikipedia.org/wiki/Tomaatti",
  likes: 7
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}



module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb
}