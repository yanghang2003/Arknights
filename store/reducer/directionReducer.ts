interface DirectionState {
  value: number
}

const initialState: DirectionState = {
  value: 1 // 默认向右
}

/* reducer */
const directionReducer = (
  state = initialState,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case 'direction/set':
      return { ...state, value: action.payload }
    default:
      return state
  }
}

/* action */
export const setDirection = (direction: number) => ({
  type: 'direction/set',
  payload: direction
})

export default directionReducer