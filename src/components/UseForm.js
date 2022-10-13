import { useState } from 'react'

export const UseForm = (submitCallBack) => {
  const [state, setState] = useState([])

  const onChangeHandler = (e) => {
    setState((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    submitCallBack()
  }
  return [state, onChangeHandler, onSubmitHandler]
}
