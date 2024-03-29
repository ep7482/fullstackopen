const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})


blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} else {
		response.status(401).json({ error: 'unauthorized' })
	}
})

blogRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	if (updatedBlog) {
		response.json(updatedBlog)
	} else {
		response.status(404).end()
	}

	// Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	// 	.then(updatedBlog => {
	// 		if (updatedBlog) {
	// 			response.json(updatedBlog)
	// 		} else {
	// 			response.status(404).end()
	// 		}
	// 	})
})

module.exports = blogRouter