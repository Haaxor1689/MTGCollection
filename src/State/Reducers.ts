import { omit } from "lodash";
import { AppState, CardList, Decks, FileIds } from ".";
import { Action } from "./Actions";

const filesReducer = (state: FileIds, action: Action): FileIds => {
    switch (action.type) {
        case "SetDeckLink":
            return {
                ...state,
                [action.name]: action.link,
            };
        case "DeleteDeck":
            return { collection: "", ...omit(state, [action.name]) };
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

const decksReducer = (state: Decks, action: Action): Decks => {
    switch (action.type) {
        case "UpdateDeck":
            return {
                ...state,
                [action.name]: action.cardList,
            };
        case "DeleteDeck":
            return { collection: [], ...omit(state, [action.name]) };
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
    decks: decksReducer,
});
