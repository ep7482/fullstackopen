import { useState } from 'react'

const Blog = ({ blog, loggedInUser, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const removeButtonVisible = { display: blog.user?.username === loggedInUser.username ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user?.name ? blog.user.name : 'User Unknown'}</div>
        <div style={removeButtonVisible}>
          <button onClick={() => handleDelete(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog