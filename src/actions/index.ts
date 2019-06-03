import { ADD_PLAYER, SET_USERNAME } from "./types";

export function addPlayer(name : string) {
    return { type: ADD_PLAYER, name }
};

export function setUsername(name : string) {
    return { type: SET_USERNAME, name }
}