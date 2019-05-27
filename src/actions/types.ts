// action names
export const ADD_PLAYER = "ADD_PLAYER";
export const RAISE_STAKE = "RAISE_STAKE";

// action types
interface  AddPlayerAction {
    type: typeof ADD_PLAYER;
    name: string;
}
interface  RaiseStakeAction {
    type: typeof RAISE_STAKE;
    amount: number;
}

export type ActionTypes = AddPlayerAction | RaiseStakeAction;