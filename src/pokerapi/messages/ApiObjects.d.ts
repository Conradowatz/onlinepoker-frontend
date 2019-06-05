import { PokerMessage } from "./PokerMessage";
export declare class DisconnectEvent {
    reason: string;
}
export declare class LobbyPreview {
    name: string;
    id: string;
    currentPlayers: number;
    maxPlayers: number;
    running: boolean;
    joinable: boolean;
    gameMode: string;
    players: string[];
}
export declare class GetLobbiesResponse extends PokerMessage {
    lobbies: LobbyPreview[];
}
export declare class JoinLobbyRequest extends PokerMessage {
    id: string;
    spectate: boolean;
    playerName?: string;
}
export declare class Player {
    id: number;
    name: string;
}
export declare type GameModeType = "texasholdem";
export declare class Settings extends PokerMessage {
    gameMode: GameModeType;
    maxPlayers: number;
}
export declare class Lobby extends PokerMessage {
    name: string;
    id: string;
    currentPlayers: number;
    currentSpectators: number;
    hidden: boolean;
    running: boolean;
    joinable: boolean;
    settings: Settings;
    availableGamemodes: string[];
    players: Map<number, Player>;
    leader: number;
    youAreLeader: boolean;
}
export declare class TexasHoldEmSettings extends Settings {
    startMoney: number;
    turnTime: number;
    useSidepots: boolean;
    blinds: Map<number, number>;
}
export declare class JoinLobbyResponse extends PokerMessage {
    success: boolean;
    reason?: "full" | "unknown_id" | "not_joinable";
    lobby?: Lobby;
}
export declare class CreateLobbyRequest extends PokerMessage {
    name: string;
    hidden: boolean;
    playerName: string;
}
export declare class ChangeGameModeRequest extends PokerMessage {
    type: GameModeType;
}
export declare class ChatOut extends PokerMessage {
    message: string;
}
export declare class ChatIn extends PokerMessage {
    message: string;
    sender: Player;
}
