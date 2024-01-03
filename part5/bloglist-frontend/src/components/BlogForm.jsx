import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ( { createBlog } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url,
		})

		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div className='formDiv'>
			<h2>Create New Blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title:
					<input
						type="text"
						value={title}
						name="Title"
						placeholder='Title'
						onChange={event => setTitle(event.target.value)}
					/>
				</div>
				<div>
					author:
					<input
						type="text"
						value={author}
						name="Author"
						placeholder='Author'
						onChange={event => setAuthor(event.target.value)}
					/>
				</div>
				<div>
					url:
					<input
						type="text"
						value={url}
						name="Url"
						placeholder='Url'
						onChange={event => setUrl(event.target.value)}
					/>
				</div>
				<button type="submit" data-testid='createButton'>create</button>
			</form>
		</div>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm