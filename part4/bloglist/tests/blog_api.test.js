const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
// const { result } = require('lodash')

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

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

})

test('if url is missing, return 400', async () => {
	const newBlog = {
		title: 'Test 3 Blog',
		author: 'Test 3 Author',
		likes: 5
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

})

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const contents = blogsAtEnd.map(r => r.title)

		expect(contents).not.toContain(blogToDelete.title)
	})

	test('fails with status code 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api
			.delete(`/api/blogs/${invalidId}`)
			.expect(400)
	})
})

describe('updating a blog', () => {
	test('update title of blog with status code 200', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			title: 'Updated Blog',
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: blogToUpdate.likes
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
	})

	test('update author of blog with status code 200', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			title: blogToUpdate.title,
			author: 'Updated Author',
			url: blogToUpdate.url,
			likes: blogToUpdate.likes
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
	})

	test('update url of blog with status code 200', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: 'https://updatedurl.com',
			likes: blogToUpdate.likes
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
	})

	test('update likes of blog with status code 200', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			title: blogToUpdate.title,
			author: blogToUpdate.author,
			url: blogToUpdate.url,
			likes: 781
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
	})

	test ('return status 404 if blog does not exist', async () => {
		const validNonexistingId = await helper.nonExistingId()
		const blogsAtStart = await helper.blogsInDb()

		await api
			.put(`/api/blogs/${validNonexistingId}`)
			.send(blogsAtStart[0])
			.expect(404)
	})
})

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('both username and password must be provided', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'Test User'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username and password must be provided')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('username must be provided', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			name: 'Test User',
			password: 'testpassword'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username and password must be provided')
		
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('password must be provided', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'testuser',
			name: 'Test User',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username and password must be provided')
		
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('username must be at least 3 characters long', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'te',
			name: 'Test User',
			password: 'testpassword'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3).')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('password must be at least 3 characters long', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'testuser',
			name: 'Test User',
			password: 'te'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('password must be at least 3 characters long')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('username must be unique', async () => {
		const newUser = {
			username: 'test',
			password: 'testpassword'
		}

		await api.post('/api/users').send(newUser).expect(201)
		const usersAtStart = await helper.usersInDb()

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		expect(result.body.error).toContain('expected `username` to be unique')
		
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})