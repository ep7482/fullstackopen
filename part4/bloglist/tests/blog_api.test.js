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

test('a blog can be added', async () => {
	const newBlog = {
		title: 'Test Blog',
		author: 'Test Author',
		url: 'https://testurl.com',
		likes: 5
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const title = blogsAtEnd.map(b => b.title)
	expect(title).toContain(
		'Test Blog'
	)
})

test('if likes missing, default to 0', async () => {
	const newBlog = {
		title: 'Test Blog'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	const likes = blogsAtEnd.find(b => b.title === 'Test Blog').likes
	expect(likes).toBe(0)
})

test('if title is missing, return 400', async () => {
	const newBlog = {
		author: 'Test 2 Author',
		url: 'https://testurl2.com',
		likes: 10
	}

	const response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	expect(response.body.error).toContain('Blog validation failed: title: Path `title` is required.')

})

test('if url is missing, return 400', async () => {
	const newBlog = {
		title: 'Test 3 Blog',
		author: 'Test 3 Author',
		likes: 5
	}

	const response = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	expect(response.body.error).toContain('Blog validation failed: url: Path `url` is required.')
})


afterAll(async () => {
	await mongoose.connection.close()
})