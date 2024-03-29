import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()

	let anecdotes = useSelector(({filter, anecdotes}) => {
		if (filter === '') {
			return anecdotes
		}
		return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
	})

	anecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
	const vote = (id) => {
		dispatch(incrementVote(id))

		const messageToDisplay = `you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`
		dispatch(setNotification(messageToDisplay, 2))
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => vote(anecdote.id)}
				/>
      )}
		</div>
	)
}

Anecdote.propTypes = {
	anecdote: PropTypes.object.isRequired,
	handleClick: PropTypes.func.isRequired
}

export default AnecdoteList