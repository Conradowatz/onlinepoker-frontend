import {PokerMessage} from "./PokerMessage";

export interface DisconnectEvent {
  reason: string;
}

export interface LobbyPreview {
  name: string;
  id: string;
  currentPlayers: number;
  maxPlayers: number;
  running: boolean;
  joinable: boolean;
  gameMode: string;
  players: string[];
}

export interface GetLobbiesResponse extends PokerMessage {
  lobbies: LobbyPreview[]
}

export interface JoinLobbyRequest extends PokerMessage {
  id: string;
  spectate: boolean;
  playerName?: string;
}

export interface Player {
  id: number;
  name: string;
}

export type GameModeType = "texasholdem";

export interface Settings extends PokerMessage {
  gameMode: GameModeType;
  maxPlayers: number;
}

export interface Lobby extends PokerMessage {
  name: string;
  id: string;
  currentPlayers: number;
  currentSpectators: number;
  hidden: boolean;
  running: boolean;
  joinable: boolean;
  settings: Settings;
  availableGamemodes: string[];
  players: Map<number, Player>; //key=Player.id
  leader: number; //Player.id
  yourId: number;
}

export interface Card extends PokerMessage {
  color: string;
  value: string;
}

export interface THSettings extends Settings {
  startMoney: number;
  turnTime: number;
  useSidepots: boolean;
  blinds: Map<number, number>;
}

export interface THPlayer extends Player {
  cards: Card[];
  money: number;
  bet: number;
  allIn: boolean;
  folded: boolean;
}

export interface THStartGame extends PokerMessage {
  players: THPlayer[];
  settings: THSettings
}

export interface THNewRound extends PokerMessage {
  players: THPlayer[];
  yourCards: Card[];
  hand: number;
  smallBlind: number;
  bigBlind: number;
  smallBlindPlayer: number;
  bigBlindPlayer: number;
}

export interface THPlayerAction extends PokerMessage {
  player: THPlayer;
  action: "call" | "fold" | "check" | "raise" | "allin" | "giveup" | "turn";
  value?: string | number | Player;
}

export interface THYourTurn extends PokerMessage {
  options: string[];
  timeout: number;
}

export interface THAction extends PokerMessage {
  action: "call" | "fold" | "check" | "raise" | "allin" | "giveup";
  value?: number;
}

export interface THCommunityCard extends PokerMessage {
  communityCards: Card[];
}

export interface THEndRound extends PokerMessage {
  reason: string;
  winners: THPlayer[];
  winningCards: Card[];
  players: THPlayer[];
}

export interface JoinLobbyResponse extends PokerMessage {
  success: boolean;
  reason?: "full" | "unknown_id" | "not_joinable";
  lobby?: Lobby;
}

export interface CreateLobbyRequest extends PokerMessage {
  name: string;
  hidden: boolean;
  playerName: string;
}

export interface ChangeGameModeRequest extends PokerMessage {
  type: GameModeType;
}

export interface ChatOut extends PokerMessage {
  message: string;
}

export interface ChatIn extends PokerMessage {
  message: string;
  sender: Player;
}