import { useState } from 'react'

export const useField = ({ type, state }) => {
  const [value, setValue] = useState(state || '')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
