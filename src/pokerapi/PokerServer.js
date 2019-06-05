"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const websocket_1 = require("websocket");
const http = require("http");
const class_transformer_1 = require("class-transformer");
const PokerMessage_1 = require("./messages/PokerMessage");
const class_validator_1 = require("class-validator");
const ApiObjects_1 = require("./messages/ApiObjects");
class PokerServer extends events_1.EventEmitter {
    constructor(port, maxConnections = 1000) {
        super();
        this.port = port;
        this.maxConnections = maxConnections;
        this.idConnectionMap = new Map();
        this.connectionIdMap = new Map();
        //create https backend server
        this.httpServer = http.createServer(((req, res) => {
            res.writeHead(404);
            res.end();
        }));
        this.httpServer.listen(port, () => console.log('Server is listening on port ' + port));
        //create underlying ws server
        this.wsServer = new websocket_1.server({
            httpServer: this.httpServer,
            autoAcceptConnections: false
        });
        this.wsServer.on("request", (request => this.onRequest(request)));
    }
    /**
     * Accepts or rejects incoming connections.
     * Sets them up to emit events to the corresponding functions.
     * @param request
     */
    onRequest(request) {
        //don't allow all connections
        if (!PokerServer.originIsAllowed(request.origin)) {
            // Make sure we only accept requests from an allowed origin
            request.reject();
            console.log('Connection from origin ' + request.origin + ' rejected.');
            return;
        }
        //check for maximum connections
        if (this.wsServer.connections.length >= this.maxConnections) {
            request.reject();
            console.log('Connection rejected. Too many active connections.');
            return;
        }
        //accept with protocol number
        if (!request.requestedProtocols.includes(PokerServer.protocol)) {
            request.reject();
            console.log('Connection with unknown protocol rejected.');
            return;
        }
        let connection = request.accept(PokerServer.protocol, request.origin);
        console.log((new Date()) + ' New connection accepted from: ' + connection.socket.localAddress);
        this.onNewConnection(connection);
        //listen to incoming messages
        connection.on("message", (message => {
            if (message.type === "utf8") {
                this.onMessage(connection, message.utf8Data);
            }
            //ignore other messages
        }));
        //handle closing
        connection.on("close", (code, desc) => this.onClose(connection, code, desc));
    }
    /**
     * Checks whether connection is allowed from the specified url.
     * @param origin a url of the form "http://server.tdl/"
     */
    static originIsAllowed(origin) {
        return true;
    }
    /**
     * Assigns a unique id to every connection and calls listeners of the
     * event "new_user" with it.
     * @param connection
     */
    onNewConnection(connection) {
        //determine unique id
        let id = Math.floor(Math.random() * this.maxConnections);
        while (this.idConnectionMap.has(id)) {
            id = (id + 1) % this.maxConnections;
        }
        //add to map
        this.idConnectionMap.set(id, connection);
        this.connectionIdMap.set(connection, id);
        //emit event
        this.emit("new_user", id);
    }
    /**
     * Handles incoming messages, passing them to listeners if correctly formatted.
     * @param connection
     * @param message
     */
    onMessage(connection, message) {
        let plainMessageObject;
        try {
            plainMessageObject = JSON.parse(message);
        }
        catch (e) {
            console.log(e);
            console.log("Received non-JSON message.");
            return;
        }
        let clientMessage = class_transformer_1.plainToClass(PokerMessage_1.ClientMessage, plainMessageObject);
        //check if its a valid message
        if (PokerServer.validateObject(clientMessage)
            && PokerServer.validateMessage(clientMessage.command, clientMessage.data)) {
            //append lobbyId to command if available
            let command = clientMessage.command;
            if (clientMessage.lobbyId != undefined) {
                command += clientMessage.lobbyId;
            }
            //send out api call
            this.emit(command, this.connectionIdMap.get(connection), clientMessage.data);
        }
        else {
            console.log("Received malformed message, ignoring.");
        }
    }
    onClose(connection, reasonCode, description) {
        //get user id
        let id = this.connectionIdMap.get(connection);
        this.emit("drop_user", id);
        this.connectionIdMap.delete(connection);
        this.idConnectionMap.delete(id);
        console.log("User disconnected. Code: " + reasonCode + " Desc: " + description);
    }
    sendMessage(id, command, message) {
        let m = new PokerMessage_1.ServerMessage();
        m.command = command;
        m.data = message;
        this.idConnectionMap.get(id).sendUTF(class_transformer_1.serialize(m));
    }
    sendMessageCall(id, command, message, callback) {
        this.sendMessage(id, command, message);
        //wait for response with the same command from the same user and pass it to callback
        let pokerAPI = this;
        let listener = function (r_id, ...r_args) {
            if (r_id === id) {
                callback(r_args);
                //deregister once its fired
                pokerAPI.off(command, this);
            }
        };
        this.on(command, listener);
    }
    broadcastMessage(command, message) {
        let m = new PokerMessage_1.ServerMessage();
        m.command = command;
        m.data = message;
        this.wsServer.connections.forEach((c) => {
            c.sendUTF(class_transformer_1.serialize(m));
        });
    }
    static validateObject(o) {
        let errors = class_validator_1.validateSync(o, this.validatorOptions);
        if (errors.length > 0) {
            console.log(errors);
            return false;
        }
        else {
            return true;
        }
    }
    static validateMessage(command, message) {
        switch (command) {
            case "get_lobbies": return message == undefined;
            case "join_lobby": return PokerServer.validateObject(class_transformer_1.plainToClass(ApiObjects_1.JoinLobbyRequest, message));
            case "create_lobby": return PokerServer.validateObject(class_transformer_1.plainToClass(ApiObjects_1.CreateLobbyRequest, message));
            case "change_gamemode": return PokerServer.validateObject(class_transformer_1.plainToClass(ApiObjects_1.ChangeGameModeRequest, message));
            case "change_settings":
                let s = class_transformer_1.plainToClass(ApiObjects_1.Settings, message);
                if (PokerServer.validateObject(s)) {
                    switch (s.gameMode) {
                        case "texasholdem":
                            return PokerServer.validateObject(class_transformer_1.plainToClass(ApiObjects_1.TexasHoldEmSettings, message));
                        default:
                            return false;
                    }
                }
                else
                    return false;
            case "chat_out": return PokerServer.validateObject(class_transformer_1.plainToClass(ApiObjects_1.ChatOut, message));
            default: return false;
        }
    }
}
PokerServer.protocol = "poker1";
PokerServer.validatorOptions = {
    forbidUnknownValues: true,
    skipMissingProperties: false
};
exports.PokerServer = PokerServer;
//# sourceMappingURL=PokerServer.js.map