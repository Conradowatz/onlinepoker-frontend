/// <reference types="node" />
import { EventEmitter } from "events";
import { Server as HttpServer } from "http";
import { connection, server as WebSocketServer } from "websocket";
import * as PokerMessage from "./messages/PokerMessage";
import { Command, ServerCommand } from "./messages/PokerMessage";
export declare class PokerServer extends EventEmitter {
    port: number;
    maxConnections: number;
    static protocol: string;
    httpServer: HttpServer;
    wsServer: WebSocketServer;
    idConnectionMap: Map<number, connection>;
    connectionIdMap: Map<connection, number>;
    constructor(port: number, maxConnections?: number);
    /**
     * Accepts or rejects incoming connections.
     * Sets them up to emit events to the corresponding functions.
     * @param request
     */
    private onRequest;
    /**
     * Checks whether connection is allowed from the specified url.
     * @param origin a url of the form "http://server.tdl/"
     */
    private static originIsAllowed;
    /**
     * Assigns a unique id to every connection and calls listeners of the
     * event "new_user" with it.
     * @param connection
     */
    private onNewConnection;
    /**
     * Handles incoming messages, passing them to listeners if correctly formatted.
     * @param connection
     * @param message
     */
    private onMessage;
    private onClose;
    sendMessage(id: number, command: Command | ServerCommand, message: PokerMessage.PokerMessage): void;
    sendMessageCall(id: number, command: Command | ServerCommand, message: PokerMessage.PokerMessage, callback: (data: PokerMessage.PokerMessage) => void): void;
    broadcastMessage(command: Command | ServerCommand, message: PokerMessage.PokerMessage): void;
    private static validatorOptions;
    private static validateObject;
    private static validateMessage;
}
