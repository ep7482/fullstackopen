const _ = require('lodash')

const dummy = (blogs) => {
	blogs
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}
	return blogs.reduce((max, blog) => max.likes >= blog.likes ? max : blog, blogs[0])
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null
	} 

	const authors = _.countBy(blogs.map(blog => blog.author))
	const most = _.maxBy(Object.entries(authors), blogNum => blogNum[1])
	return {
		'author': most[0],
		'blogs': most[1]
	}
	// let dict = authors.reduce((dict, author) => {
	// 	dict[author] = (dict[author] || 0) + 1
	// 	return dict
	// }, {})


	// const most = Object.entries(dict).reduce((max, [author, blogs]) => {
	// 	return blogs > max.blogs ? {author, blogs} : max
	// }, {author: null, blogs: 0})
	// return most
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}