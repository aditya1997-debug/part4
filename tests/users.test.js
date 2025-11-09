const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('User creation validations', () => {

  test('Username not provided', async () => {
    const userObject = {
      'password': '1234',
      'name': 'Kakashi Dalvi'
    }
    await api
      .post('/api/users/')
      .send(userObject)
      .expect(400)
  })

  test('Password not provided', async () => {
    const userObject = {
      'username': '7_Tails',
      'name': 'Kakashi Dalvi'
    }
    await api
      .post('/api/users/')
      .send(userObject)
      .expect(400)
  })

  test('Username has less than 3 characters', async () => {
    const userObject = {
      'username': 'Ad',
      'password': '1234',
      'name': 'Kakashi Dalvi'
    }
    await api
      .post('/api/users/')
      .send(userObject)
      .expect(400)
  })

  test('Password has less than 3 characters', async () => {
    const userObject = {
      'username': '1_Tail',
      'password': '12',
      'name': 'Kakashi Dalvi'
    }
    await api
      .post('/api/users/')
      .send(userObject)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})