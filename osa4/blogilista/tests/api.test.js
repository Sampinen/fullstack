

const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('Blogs loaded correctly', () =>{
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')

      const contents = response.body.map(e => e.title)
      assert(contents.includes('Banaani'))
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('Id field is .id and not ._id', async () => {
      const response = await api.get('/api/blogs')
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

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.findLast(blog=>blog)
    console.log("Contents: "+contents)
    assert.equal(contents.title, "Kahvi")
    assert.equal(contents.author, "Wikipedia")
    assert.equal(contents.url,"https://fi.wikipedia.org/wiki/Kahvi")
    assert.equal(contents.likes,9)
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

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('Deleting blogs works correctly', ()=>{
  test('Can delete blog with matching id', async()=> {
    const response = await api.get('/api/blogs')
    const validID = response.body[0].id.toString()
    console.log(validID)
    await api.delete(`/api/blogs/${validID}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
  })
  test('Deleting blog with Id that does not exists does not delete a blog', async () => {
    await api.delete(`/api/blogs/6ac387c8180fbacf498baa1a`).expect(404)
    await api.delete(`/api/blogs/6ac387c80fbacf498baa1a`).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  })
})


after(async () => {
  await mongoose.connection.close()
})