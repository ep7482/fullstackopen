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
export default notificationSlice.reducer
