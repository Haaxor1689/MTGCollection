import { CounterVariant } from ".";

type Restart = {
    type: "Restart";
}

type SetPlayers = {
    type: "SetPlayers";
    count: number;
};

type SetStartingPlayer = {
    type: "SetStartingPlayer";
    player: number | null;
};

type SetName = {
    type: "SetName";
    player: number;
    name: string;
};

type ToggleCounter = {
    type: "ToggleCounter";
    player: number;
    counter: CounterVariant;
};

type SetStartingLife = {
    type: "SetStartingLife";
    value: number;
};

type SetPlayerCounter = {
    type: "SetPlayerCounter";
    player: number;
    counter?: CounterVariant;
    value: number;
};

export type Action = Restart | SetPlayers | SetStartingPlayer | SetName | ToggleCounter | SetStartingLife | SetPlayerCounter;
