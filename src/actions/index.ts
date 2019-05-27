import { ADD_PLAYER } from "./types";

export function addPlayer(name : string) {
    return { type: ADD_PLAYER, name }
};