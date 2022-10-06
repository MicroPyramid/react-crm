export const validateFields = (val) => {
  let value = {}
  if (Object.keys(val).length === 0 || val.leadName === '') {
    value = {
      leadError: ' * lead Name required',
      setMsg: true
    }
    return value
  } if (Object.keys(val).length === 0 || val.amount === '') {
    value = {
      amountError: ' * amount  required',
      setMsg: true
    }
    return value
  }
}
