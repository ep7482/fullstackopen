import { useSelector, useDispatch } from 'react-redux'
import { voteAct } from '../reducers/anecdoteReducer'
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

	const anecdotes = useSelector(({filter, anecdotes}) => {
		if (filter === '') {
			return anecdotes
		}
		return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
	})

	const vote = (id) => dispatch(voteAct(id))

	return (
		<div>
			{anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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