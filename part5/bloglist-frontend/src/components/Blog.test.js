import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Test Title',
		author: 'Test Author',
		url: 'Test-URL.com',
		likes: 0,
	}

	const loggedUser = {
		username: 'testuser',
		name: 'Test User'
	}

	const mockHandler = jest.fn()

	const { container } = render(
		<Blog
			blog={blog}
			loggedInUser={loggedUser}
			handleLike={mockHandler}
			handleDelete={mockHandler}
		/>
	)

	const div = container.querySelector('.titleAuthor')
	expect(div).toHaveTextContent('Test Title Test Author')
	expect(div).not.toHaveTextContent('Test-URL.com')
	expect(div).not.toHaveTextContent('likes 0')
})

test('clicking the button shows url and likes', async () => {
	const blog = {
		title: 'Test Title',
		author: 'Test Author',
		url: 'Test-URL.com',
		likes: 0,
	}

	const loggedUser = {
		username: 'testuser',
		name: 'Test User'
	}

	const mockHandler = jest.fn()

	render(
		<Blog
			blog={blog}
			loggedInUser={loggedUser}
			handleLike={mockHandler}
			handleDelete={mockHandler}
		/>
	)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	expect(screen.getByText('Test-URL.com')).toBeInTheDocument()
	expect(screen.getByText('likes 0')).toBeInTheDocument()
})

test('clicking the like button twice calls event handler twice', async () => {
	const blog = {
		title: 'Test Title',
		author: 'Test Author',
		url: 'Test-URL.com',
		likes: 0
	}

	const loggedUser = {
		username: 'testuser',
		name: 'Test User'
	}

	const mockHandler = jest.fn()

	render(
		<Blog
			blog={blog}
			loggedInUser={loggedUser}
			handleLike={mockHandler}
			handleDelete={mockHandler}
		/>
	)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})