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

type SetStartingLife = {
    type: "SetStartingLife";
    value: number;
}

export type Action = SetPlayers | SetName | ToggleCounter | SetStartingLife;
