import { omit } from "lodash";
import { AppState, CardList, Decks, FileIds, SymbolList } from ".";
import { Action } from "./Actions";

const filesReducer = (state: FileIds, action: Action): FileIds => {
    switch (action.type) {
        case "CreateDeck":
            return {
                ...state,
                [action.name]: action.link,
            };
        case "DeleteDeck":
            return { ...omit(state, [action.name]) } as FileIds;
    }
    return state;
};

const cardListReducer = (state: CardList, action: Action): CardList => {
    switch (action.type) {
        case "AddCard":
            return {
                ...state,
                [action.card.name]: action.card,
            };
    }
    return state;
};

const symbolListReducer = (state: SymbolList, action: Action): SymbolList => {
    switch (action.type) {
        case "AddSymbols":
            return action.symbols.reduce((obj, s) => ({ ...obj, [s.symbol]: s }), {});
    }
    return state;
};

const decksReducer = (state: Decks, action: Action): Decks => {
    switch (action.type) {
        case "CreateDeck":
            return {
                ...state,
                [action.name]: {
                    cards: [],
                    ...omit(action, ["type", "link"]),
                },
            };
        case "UpdateDeck":
            return {
                ...state,
                [action.name]: {
                    ...state[action.name],
                    ...omit(action, ["type"]),
                },
            };
        case "DeleteDeck":
            return { ...omit(state, [action.name]) } as Decks;
    }
    return state;
};

const selectedDeckReducer = (state: string | null, action: Action): string | null => {
    switch (action.type) {
        case "SelectDeck":
            return action.name;
        case "DeleteDeck":
            return action.name === state ? null : state;
    }
    return state;
};

const combineReducers = <State, Action>(reducers: { [P in keyof State]: (state: State[P], action: Action) => State[P] }) => {
    return (state: State, action: Action) => {
        const temp: State = {} as any;
        for (const i in reducers) {
            temp[i] = reducers[i](state[i], action);
        }
        return temp;
    };
};

export const reducer = combineReducers<AppState, Action>({
    files: filesReducer,
    cardList: cardListReducer,
    symbolList: symbolListReducer,
    decks: decksReducer,
    selectedDeck: selectedDeckReducer,
});
