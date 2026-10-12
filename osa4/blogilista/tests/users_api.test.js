const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')



const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Juuri', passwordHash: passwordHash })

    await user.save()
})



describe('when there is initially one user at db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'sanna23',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  test("can't add passoword that is shorter than 3", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'samppa87',
      name: 'Samuli Virtanen',
      password: '1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test("can't add user with already existing username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Juuri Juurinen',
      password: 'ErittäinSalainen',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test("can't add user with no username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'JaskaJokunen134',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test("can't add user with no password", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'kissakala',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})