import React from "react";
import { MakeTuple } from "../../Utility";
import DeepReadonly from "../../Utility/DeepReadonly";
import { Action } from "./Actions";

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
}>;

export const initialState: LifecounterStateT = {
    players: [],
};

export const LifecounterState = React.createContext<[LifecounterStateT, React.Dispatch<Action>]>([initialState, undefined as any]);
