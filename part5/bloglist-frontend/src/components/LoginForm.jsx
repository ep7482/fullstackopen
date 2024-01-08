import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
	errormessage
}) => {
	return (
		<div>
			<h2>Log in to application</h2>
			<Notification message={errormessage} type='error'/>
			<form onSubmit={handleSubmit}>
				<div>
					username
					<input
						id='username'
						type="text"
						value={username}
						name="Username"
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						id='password'
						type="password"
						value={password}
						name="Password"
						onChange={handlePasswordChange}
					/>
				</div>
				<button id='login-button' type="submit">login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	errormessage: PropTypes.string
}

export default LoginForm