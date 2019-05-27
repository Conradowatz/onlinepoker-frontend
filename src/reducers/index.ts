import { ADD_PLAYER, RAISE_STAKE, ActionTypes } from "../actions/types";

const initialState = {
    players: [],
    stake: 0,
};

/***
 * Root Reducer
 * @param state current state, default: initialState
 * @param action the action to be performed at the state
 */
function rootReducer(state = initialState, action: ActionTypes) {
    switch (action.type) {
        case ADD_PLAYER:
            return {
                players: [...state.players, action.name]
            }
        case RAISE_STAKE:
            return {
                stake: state.stake
            }
        default:
            return state
    }
};

export default rootReducer;