export const incrementCount = (count = 1) => {
  return {
    type: 'INCREMENT_COUNT',
    count
  }
}
export const decrementCount = () => {
  return {
    type: 'DECREMENT_COUNT'
  }
}
export const resetFieldsCompleted = () => {
  return {
    type: 'RESET_COUNT'
  }
}
