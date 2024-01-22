import { useState } from 'react'

export const useField = (type) => {
	let startValue = null
	if (type === 'text') {
		startValue = ''
	} else if (type === 'number') {
		startValue = 0
	}
	const [value, setValue] = useState(startValue)

	const onChange = (event) => {
		setValue(event.target.value)
	}

	const reset = () => {
		setValue(startValue)
	}

	return {
		inputProps: {
			type,
			value,
			onChange,
		},
		reset,
	}
}