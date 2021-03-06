import omit from "lodash-es/omit";
import { instantiatePlayers, LifecounterStateT, PlayerInfoArray } from ".";
import { chainReducers, combineReducers } from "../../Utility";
import { Action } from "./Actions";
import { mapValues } from "lodash-es";

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
        case "SetPlayerCounter":
            return state.map((p, i) =>
                i === action.player
                    ? action.counter
                        ? { ...p, counters: { ...p.counters, [action.counter]: p.counters[action.counter]! + action.value } }
                        : { ...p, life: p.life + action.value }
                    : p
            );
        case "SetStartingLife":
            return state.map(p => ({ ...p, life: action.value }));
    }
    return state;
};

const startingLifeReducer = (state: number, action: Action): number => {
    switch (action.type) {
        case "SetStartingLife":
            return action.value;
    }
    return state;
};

const startingPlayerReducer = (state: number | null, action: Action): number | null => {
    switch (action.type) {
        case "SetStartingPlayer":
            return action.player;
    }
    return state;
};

export const combinedReducer = combineReducers<LifecounterStateT, Action>({
    players: playerReducer,
    startingLife: startingLifeReducer,
    startingPlayer: startingPlayerReducer,
});

const restartReducer = (state: LifecounterStateT, action: Action): LifecounterStateT => {
    switch (action.type) {
        case "Restart":
            return {
                ...state,
                players: state.players.map(p => ({ ...p, life: state.startingLife, counters: mapValues(p.counters, () => 0) })),
                startingPlayer: null,
            };
    }
    return state;
};

export const reducer = chainReducers<LifecounterStateT, Action>(combinedReducer, restartReducer);
