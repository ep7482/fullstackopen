import Notification from './Notification'

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
						type="text"
						value={username}
						name="Username"
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm