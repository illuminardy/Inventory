const initialState = {
  fieldsCompleted: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        fieldsCompleted: state.fieldsCompleted + action.count
      }
    case 'DECREMENT_COUNT':
      return {
        fieldsCompleted: state.fieldsCompleted > 0 ? --state.fieldsCompleted : 0
      }
    case 'RESET_COUNT':
      return {
        fieldsCompleted: 0
      }
    default:
      return state
  }
}
