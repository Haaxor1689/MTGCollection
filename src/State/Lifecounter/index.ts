import React from "react";
import { MakeTuple } from "../../Utility";
import DeepReadonly from "../../Utility/DeepReadonly";
import { Action } from "./Actions";

export const instantiatePlayers = (count: number): PlayerInfoArray => Array.from(Array(count), (_, i) => ({ name: `Player ${i + 1}`, life: 0, counters: {} }));

export const Counters = MakeTuple("{W}", "{U}", "{B}", "{R}", "{G}", "{C}", "{S}", "{E}", "{B/P}");
export type CounterVariant = typeof Counters[number];
export type PlayerCounters = Partial<Record<CounterVariant, number>>;

export type PlayerInfo = {
    name: string;
    life: number;
    counters: PlayerCounters;
};

export type PlayerInfoArray = DeepReadonly<PlayerInfo[]>;

export type LifecounterStateT = DeepReadonly<{
    players: PlayerInfoArray;
    startingLife: number;
}>;

export const initialState: LifecounterStateT = {
    players: instantiatePlayers(2),
    startingLife: 20,
};

export const LifecounterState = React.createContext<[LifecounterStateT, React.Dispatch<Action>]>([initialState, undefined as any]);
