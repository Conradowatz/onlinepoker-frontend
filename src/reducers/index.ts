import { ADD_PLAYER, RAISE_STAKE, ActionTypes } from "../actions/types";
import { State } from "../store/types";

const initialState: State = {
    players: [],
    stake: 0,
};

/***
 * Root Reducer
 * @param state current state, default: initialState
 * @param action the action to be performed at the state
 */
function rootReducer(state = initialState, action: ActionTypes): State {
    switch (action.type) {
        case ADD_PLAYER:
            return Object.assign({}, state, {
                players: state.players.concat(action.name)
            });
        case RAISE_STAKE:
            return Object.assign({}, state, {
                stake: action.amount
            });
        default:
            return state
    }
};

export default rootReducer;