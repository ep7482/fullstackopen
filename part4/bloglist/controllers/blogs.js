const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	})

	// blog
	// 	.save()
	// 	.then(result => {
	// 		response.status(201).json(result)
	// 	})
	// 	.catch(error => next(error))

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

module.exports = blogRouter