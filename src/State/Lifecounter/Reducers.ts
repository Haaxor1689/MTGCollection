import omit from "lodash.omit";
import { LifecounterStateT, PlayerInfoArray } from ".";
import { combineReducers } from "../../Utility";
import { Action } from "./Actions";

const instantiatePlayers = (count: number): PlayerInfoArray => Array.from(Array(count), (_, i) => ({ name: `Player ${i + 1}`, life: 0, counters: {} }));

const playerReducer = (state: PlayerInfoArray, action: Action): PlayerInfoArray => {
    switch (action.type) {
        case "SetPlayers":
            return state.length < action.count ? [...state, ...instantiatePlayers(action.count).slice(state.length)] : state.slice(0, action.count);
        case "SetName":
            return state.map((p, i) => (i === action.player ? { ...p, name: action.name } : p));
        case "ToggleCounter":
            return state.map((p, i) =>
                i === action.player
                    ? { ...p, counters: p.counters[action.counter] === undefined ? { ...p.counters, [action.counter]: 0 } : omit(p.counters, action.counter) }
                    : p
            );
    }
};

export const reducer = combineReducers<LifecounterStateT, Action>({
    players: playerReducer,
});
