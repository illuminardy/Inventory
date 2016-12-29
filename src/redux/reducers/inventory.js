const initialState = {
  isVisible: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_NEW_ITEM_ACTIVE':
      return {
        isVisible: action.isVisible
      }
    default:
      return state
  }
}
