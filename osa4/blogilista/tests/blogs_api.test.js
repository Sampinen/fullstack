

const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)
const jwt = require('jsonwebtoken')
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  const passwordHash = await bcrypt.hash('salainen', 10)

  const user = new User ({
      username: 'testaaja',
      passwordHash: passwordHash,
  })

  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id.toString()
  }


  token = jwt.sign(userForToken, process.env.SECRET)

})


describe('Blogs loaded correctly', () =>{
    test('blogs are returned as json', async () => {

      
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .set("Authorization", `Bearer ${token}`)
    })

    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')
      .set("Authorization", `Bearer ${token}`)

      const contents = response.body.map(e => e.title)
      assert(contents.includes('Banaani'))
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs').set("Authorization", `Bearer ${token}`)
      console.log(response.body)
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('Id field is .id and not ._id', async () => {
      const response = await api
      .get('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      assert(Object.keys(response.body[0]).includes("id"))
    })
})

describe('Adding blogs works correctly', () =>{
  test('a valid blog can be added ', async () => {
    const newBlog = {
    title: "Kahvi",
    author: "Wikipedia",
    url: "https://fi.wikipedia.org/wiki/Kahvi",
    likes: 9,
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set("Authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.findLast(blog=>blog)
    console.log("Contents: "+contents)
    assert.equal(contents.title, "Kahvi")
    assert.equal(contents.author, "Wikipedia")
    assert.equal(contents.url,"https://fi.wikipedia.org/wiki/Kahvi")
    assert.equal(contents.likes,9)
  })
  test('Can not add blog without token ', async () => {
    const newBlog = {
    title: "Kahvi",
    author: "Wikipedia",
    url: "https://fi.wikipedia.org/wiki/Kahvi",
    likes: 9,
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .set("Authorization", "")

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })


  test('If no likes specified, set likes at 0', async () => {
    const newBlog = {
    title: "What We Heard From the Creative Commons Community",
    author: "Jocelyn Miyaraa",
    url: "https://creativecommons.org/2026/10/01/what-we-heard-from-the-creative-commons-community/",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set("Authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)
    const contents = blogsAtEnd.findLast(blog=>blog)
    assert.equal(contents.title, "What We Heard From the Creative Commons Community")
    assert.equal(contents.likes,0)
  })

  test('If title missing, no new blog added', async () => {
    const newBlog = {
    author: "Anna Tumadóttir",
    url: "https://creativecommons.org/2026/09/30/openness-digital-sovereignty-who-sustains-the-commons/",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set("Authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('If url missing, no new blog added', async () => {
    const newBlog = {
    title: "Openness & Digital Sovereignty: Who Sustains the Commons?",
    author: "Anna Tumadóttir",
    likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set("Authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('Deleting blogs works correctly', ()=>{
  test('Can delete blog with matching id', async()=> {
    const newBlog = {
    title: "Kahvi",
    author: "Wikipedia",
    url: "https://fi.wikipedia.org/wiki/Kahvi",
    likes: 9,
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set("Authorization", `Bearer ${token}`)
    let blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const blog = blogsAtEnd.findLast(blog=>blog)

    await api.delete(`/api/blogs/${blog.id}`)
    .expect(204)
    .set("Authorization", `Bearer ${token}`)

    blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
  test('Deleting blog with Id that does not exists does not delete a blog', async () => {
    await api.delete(`/api/blogs/6ac387c8180fbacf498baa1a`)
    .expect(404)
    .set("Authorization", `Bearer ${token}`)
    await api.delete(`/api/blogs/6ac387c80fbacf498baa1a`)
            .expect(400)
            .set("Authorization", `Bearer ${token}`)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  })
})

describe('Updating blog works correctly', ()=>{
  test('Can edit blog with matching id', async()=>{
    const newBlog = {
    title: "Kahvi",
    author: "Wikipedia",
    url: "https://fi.wikipedia.org/wiki/Kahvi",
    likes: 9,
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set("Authorization", `Bearer ${token}`)
    let blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const blog = blogsAtEnd.findLast(blog=>blog)
    const validID = blog.id
    console.log(blogsAtEnd)
    const editBlog = {
    title: "Banana",
    url: "https://en.wikipedia.org/wiki/Banana",
    likes: 6
    }
    console.log("api: "+ editBlog)

    await api
      .put(`/api/blogs/${validID}`)
      .send(editBlog)
      .set("Authorization", `Bearer ${token}`)
    blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)
    const editedBlog = blogsAtEnd.findLast(blog=>blog)
    assert.strictEqual(editedBlog.title, "Banana")
    assert.strictEqual(editedBlog.author, "Wikipedia")
    assert.strictEqual(editedBlog.url, "https://en.wikipedia.org/wiki/Banana")
    assert.strictEqual(editedBlog.likes, 6)
  })
})

after(async () => {
  await mongoose.connection.close()
})