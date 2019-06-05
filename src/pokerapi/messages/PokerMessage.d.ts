export declare class PokerMessage {
}
export declare type Command = "get_lobbies" | "join_lobby" | "create_lobby";
export declare type ClientCommand = "change_settings" | "change_gamemode" | "change_settings" | "chat_out";
export declare type ServerCommand = "disconnect" | "lobby_update" | "chat_in";
export declare class ServerMessage {
    command: Command | ServerCommand;
    data: PokerMessage;
}
export declare class ClientMessage {
    command: Command | ClientCommand;
    lobbyId?: string;
    data: PokerMessage;
}
