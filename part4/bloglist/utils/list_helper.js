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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}