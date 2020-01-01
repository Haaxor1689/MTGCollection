import React from "react";
import { AppState, Deck, DeckCard } from ".";
import Scry from "../Utility/Scry";
import { Action } from "./Actions";

export const downloadCards = (dispatch: React.Dispatch<Action>, state: AppState) => (deck: Deck) => {
    const missingCards = Object.values(deck?.cards ?? {})
        .reduce((prev, val) => [...prev, ...Object.values(val)], [] as DeckCard[])
        .filter(card => !state.cardList[card.name]);
    Scry.Cards.Collection(missingCards.map(card => ({ name: card.name }))).then(cards => dispatch({ type: "AddCards", cards }));
};
