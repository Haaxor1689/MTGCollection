import { CounterVariant } from ".";

type SetPlayers = {
    type: "SetPlayers";
    count: number;
}

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

export type Action = SetPlayers | SetName | ToggleCounter;
