const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is defined', async () => {
	const blogs = await helper.blogsInDb()

	blogs.forEach(blog => {
		expect(blog.id).toBeDefined()
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})