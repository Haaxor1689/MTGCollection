import omit from "lodash.omit";
import { instantiatePlayers, LifecounterStateT, PlayerInfoArray } from ".";
import { chainReducers, combineReducers } from "../../Utility";
import { Action } from "./Actions";

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
    return state;
};

const startingLifeReducer = (state: number, action: Action): number => {
    console.log("life");
    switch (action.type) {
        case "SetStartingLife":
            return action.value;
    }
    return state;
};

const combinedReducer = combineReducers<LifecounterStateT, Action>({
    players: playerReducer,
    startingLife: startingLifeReducer,
});

const lifeFixReducer = (state: LifecounterStateT, action: Action): LifecounterStateT => {
    switch (action.type) {
        case "SetPlayers":
        case "SetStartingLife":
            return {
                ...state,
                players: state.players.map(p => ({ ...p, life: state.startingLife })),
            };
    }
    return state;
};

export const reducer = chainReducers<LifecounterStateT, Action>(combinedReducer, lifeFixReducer);
