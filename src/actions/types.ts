// action names
export const ADD_PLAYER = "ADD_PLAYER";
export const RAISE_STAKE = "RAISE_STAKE"
export const SET_USERNAME = "SET_USERNAME";

// action types
interface  AddPlayerAction {
    type: typeof ADD_PLAYER;
    name: string;
}
interface  RaiseStakeAction {
    type: typeof RAISE_STAKE;
    amount: number;
}
interface SetUsernameAction {
    type: typeof SET_USERNAME;
    name: string;
}

export type ActionTypes = AddPlayerAction
    | RaiseStakeAction
    | SetUsernameAction;