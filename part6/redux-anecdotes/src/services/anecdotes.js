import axios from "axios"

const baseUrl = "http://localhost:3002/anecdotes"

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const object = { content, votes: 0 }
	const response = await axios.post(baseUrl, object)
	return response.data
}

const updateVotes = async (id) => {
	const anecdoteToChange = await axios.get(`${baseUrl}/${id}`)
	const changedAnecdote = {
		...anecdoteToChange.data,
		votes: anecdoteToChange.data.votes + 1
	}
	const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
	return response.data
}

export default { getAll, createNew, updateVotes }