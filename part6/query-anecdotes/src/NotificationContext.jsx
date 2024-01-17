/* eslint-disable */
import { createContext, useReducer, useContext } from "react"

const NotificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTIFICATION":
			return action.payload
		case "CLEAR_NOTIFICATION":
			return ''
		default: 
			return state
	}
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
	const [notification, dispatch] = useReducer(NotificationReducer, '')

	return (
		<NotificationContext.Provider value={{notification, dispatch}}>
			{props.children} 
		</NotificationContext.Provider>
	)
}

export const useNotificationValue = () => {
	const {notification} = useContext(NotificationContext)
	return notification
}

export const useNotificationDispatch = () => {
	const {dispatch} = useContext(NotificationContext)
	setTimeout(() => {
		dispatch({type: 'CLEAR_NOTIFICATION'})
	}, 5000)
	return dispatch
}

export default NotificationContext 