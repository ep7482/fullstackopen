import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/dom'

test('BlogForm calls the event handler it received as props with the right details when a new blog is created', async () => {
	const createBlog = jest.fn()

	render(
		<BlogForm createBlog={createBlog} />
	)

	const titleInput = screen.getByPlaceholderText('Title')
	const authorInput = screen.getByPlaceholderText('Author')
	const urlInput = screen.getByPlaceholderText('Url')
	const createButton = screen.getByTestId('createButton')

	await userEvent.type(titleInput, 'Test Title')
	await userEvent.type(authorInput, 'Test Author')
	await userEvent.type(urlInput, 'Test-URL.com')
	await userEvent.click(createButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
	expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
	expect(createBlog.mock.calls[0][0].url).toBe('Test-URL.com')
})