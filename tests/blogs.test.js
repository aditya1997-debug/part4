const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const bloglist = require('../models/bloglist')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('Blog with Most Likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('Blog with Most Likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('Most Blogs', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('Author with Most Blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Author with Most Likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  test('Author with Most Likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

describe('Exercise 4.8 - 4.12', () => {
  let token

  beforeEach(async () => {
    await bloglist.deleteMany({})
    await User.deleteMany({})

    const newUser = {
      username: 'aditya',
      name: 'Aditya Dalvi',
      password: 'secret123'
    }
    await api.post('/api/users').send(newUser)

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'aditya', password: 'secret123' })

    token = `Bearer ${loginResponse.body.token}`

    const blogs = [
      { title: 'First Blog', author: 'Author 1', url: 'url1.com', likes: 5 },
      { title: 'Second Blog', author: 'Author 2', url: 'url2.com', likes: 10 }
    ]

    for (const blog of blogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(blog)
    }
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response  = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // console.log('=============>', response.body)

    response.body.forEach(blog => {
      assert.ok(blog.id)
    })
  })

  test('successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'How Maa Tara Guided Me Part 101',
      author: 'Aditya Dalvi',
      url: 'dummy-url.com',
      likes: 9142353647110000,
    }

    const initial_length = await api.get('/api/blogs/')

    await api
      .post('/api/blogs/')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const final_length = await api.get('/api/blogs/')

    assert.strictEqual(final_length.body.length, initial_length.body.length + 1)
  })

  test('fails to create a new blog without token (401 Unauthorized)', async () => {
    const newBlog = {
      title: 'How Maa Tara Guided Me Part 101',
      author: 'Aditya Dalvi',
      url: 'dummy-url.com',
      likes: 9142353647110000,
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(401)
  })

  test('likes property will default to the value 0 if not provided', async () => {

    const newBlog = {
      title: 'How Maa Tara Guided Me Part 101',
      author: 'Aditya Dalvi',
      url: 'dummy-url.com'
    }

    const result = await api
      .post('/api/blogs/')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)

  })

  test('Sending 400 Bad Request if title is missing', async () => {

    const newBlog = {
      author: 'Aditya Dalvi',
      url: 'dummy-url.com'
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

  })

  test('Sending 400 Bad Request if url is missing', async () => {

    const newBlog = {
      title: 'How Maa Tara Guided Me Part 101',
      author: 'Aditya Dalvi',
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
  })

  test('returns the correct amount of blog posts in the JSON format', async () => {
    const response  = await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // console.log('=============>', response.body.length)

    assert.strictEqual(response.body.length, 2)
  })

  test('deleting a single blog post resource', async () => {
    const blog = await bloglist.find({})
    const blogToDelete = blog[0]

    // console.log('blog to delete id:', blogToDelete.id)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)
  })

  test('successfully updates the likes of a blog', async () => {
    const blogsAtStart = await bloglist.find({})
    const blogToUpdate = blogsAtStart[0]

    const newLikes = { likes: 42 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', token)
      .send(newLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // console.log('likes ====>',response.body.likes)
    assert.strictEqual(response.body.likes, newLikes.likes)

    const updatedBlog = await bloglist.findById(blogToUpdate.id)
    // console.log('updated likes ====>',updatedBlog.likes)
    assert.deepStrictEqual(updatedBlog.likes, newLikes.likes)

  })

})



after(async () => {
  await mongoose.connection.close()
})