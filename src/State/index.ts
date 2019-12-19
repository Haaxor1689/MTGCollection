import React from "react";
import Scry from "scryfall-sdk";
import DeepReadonly from "../Utility/DeepReadonly";
import { ScryCardSymbol, ScrySet } from "../Utility/Scry/Types";
import { Action } from "./Actions";

export enum DeckName {
    Collection = "_collection",
    Wishlist = "_wishlist",
}

export enum SectionName {
    Default = "_default",
    Sideboard = "Sideboard",
    Maybeboard = "Maybeboard",
}

export const EmptyCards = (...sections: string[]): DeckCards => sections.reduce((obj, s) => ({ ...obj, [s]: {} }), { [SectionName.Default]: {} });

export type DeckCardList = DeepReadonly<{
    [cardName: string]: DeckCard;
}>;

export type DeckCards = DeepReadonly<{
    [SectionName.Default]: DeckCardList;
    [section: string]: DeckCardList;
}>;

export type DeckCard = DeepReadonly<{
    amount: number;
    name: string;
    comment?: string;
}>;

export type DeckProps = Omit<Deck, "cards">;

export type Deck = DeepReadonly<{
    name: string;
    previewUrl?: string;
    cards: DeckCards;
}>;

export type FileIds = DeepReadonly<{
    [DeckName.Collection]: string;
    [DeckName.Wishlist]: string;
    [deckName: string]: string;
}>;

export type Decks = DeepReadonly<{
    [DeckName.Collection]: Deck;
    [DeckName.Wishlist]: Deck;
    [deckName: string]: Deck;
}>;

export type CardList = DeepReadonly<{
    [cardName: string]: Scry.Card;
}>;

export type SymbolList = DeepReadonly<{
    [symbol: string]: ScryCardSymbol;
}>;

export type SetList = DeepReadonly<{
    [setName: string]: ScrySet;
}>;

export type ModifierKeys = DeepReadonly<{
    shift: boolean;
}>

export type AppState = DeepReadonly<{
    files: FileIds;
    decks: Decks;
    cardList: CardList;
    symbolList: SymbolList;
    setList: SetList;
    selectedDeck: string | null;
    modifierKeys: ModifierKeys;
}>;

export const initialState: AppState = {
    files: {
        [DeckName.Collection]: "",
        [DeckName.Wishlist]: "",
    },
    decks: {
        [DeckName.Collection]: { name: DeckName.Collection, cards: EmptyCards() },
        [DeckName.Wishlist]: { name: DeckName.Wishlist, cards: EmptyCards() },
    },
    cardList: {},
    symbolList: {},
    setList: {},
    selectedDeck: null,
    modifierKeys: {
        shift: false,
    }
};

export const State = React.createContext<[AppState, React.Dispatch<Action>]>([initialState, undefined as any]);
