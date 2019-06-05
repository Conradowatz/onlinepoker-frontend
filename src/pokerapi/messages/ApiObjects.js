"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const PokerMessage_1 = require("./PokerMessage");
const GameMode_1 = require("../../src/GameMode");
const class_validator_1 = require("class-validator");
class DisconnectEvent {
}
exports.DisconnectEvent = DisconnectEvent;
class LobbyPreview {
}
exports.LobbyPreview = LobbyPreview;
class GetLobbiesResponse extends PokerMessage_1.PokerMessage {
}
exports.GetLobbiesResponse = GetLobbiesResponse;
class JoinLobbyRequest extends PokerMessage_1.PokerMessage {
}
__decorate([
    class_validator_1.IsAlphanumeric(),
    __metadata("design:type", String)
], JoinLobbyRequest.prototype, "id", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], JoinLobbyRequest.prototype, "spectate", void 0);
__decorate([
    class_validator_1.Length(1, 20),
    __metadata("design:type", String)
], JoinLobbyRequest.prototype, "playerName", void 0);
exports.JoinLobbyRequest = JoinLobbyRequest;
class Player {
}
exports.Player = Player;
class Settings extends PokerMessage_1.PokerMessage {
}
__decorate([
    class_validator_1.IsIn(GameMode_1.GameMode.availableGamemodes),
    __metadata("design:type", String)
], Settings.prototype, "gameMode", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], Settings.prototype, "maxPlayers", void 0);
exports.Settings = Settings;
class Lobby extends PokerMessage_1.PokerMessage {
}
exports.Lobby = Lobby;
class TexasHoldEmSettings extends Settings {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], TexasHoldEmSettings.prototype, "startMoney", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], TexasHoldEmSettings.prototype, "turnTime", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], TexasHoldEmSettings.prototype, "useSidepots", void 0);
__decorate([
    class_validator_1.IsInt({ each: true }),
    class_validator_1.Min(1, { each: true }),
    __metadata("design:type", Map)
], TexasHoldEmSettings.prototype, "blinds", void 0);
exports.TexasHoldEmSettings = TexasHoldEmSettings;
class JoinLobbyResponse extends PokerMessage_1.PokerMessage {
}
exports.JoinLobbyResponse = JoinLobbyResponse;
class CreateLobbyRequest extends PokerMessage_1.PokerMessage {
}
__decorate([
    class_validator_1.Length(1, 20),
    __metadata("design:type", String)
], CreateLobbyRequest.prototype, "name", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateLobbyRequest.prototype, "hidden", void 0);
__decorate([
    class_validator_1.Length(1, 20),
    __metadata("design:type", String)
], CreateLobbyRequest.prototype, "playerName", void 0);
exports.CreateLobbyRequest = CreateLobbyRequest;
class ChangeGameModeRequest extends PokerMessage_1.PokerMessage {
}
__decorate([
    class_validator_1.IsIn(GameMode_1.GameMode.availableGamemodes),
    __metadata("design:type", String)
], ChangeGameModeRequest.prototype, "type", void 0);
exports.ChangeGameModeRequest = ChangeGameModeRequest;
class ChatOut extends PokerMessage_1.PokerMessage {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChatOut.prototype, "message", void 0);
exports.ChatOut = ChatOut;
class ChatIn extends PokerMessage_1.PokerMessage {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ChatIn.prototype, "message", void 0);
exports.ChatIn = ChatIn;
//# sourceMappingURL=ApiObjects.js.map