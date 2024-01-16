import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    message(state, action) {
      return action.payload
    },
		clearMessage() {
			return ''
		}
  }
})

export const { message, clearMessage } = notificationSlice.actions

export const setNotification = (notificationMessage, time) => {
  return async dispatch => {
    dispatch(message(notificationMessage))
    setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}
export default notificationSlice.reducer
