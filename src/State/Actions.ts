import Scry from "scryfall-sdk";
import { DeckCard, DeckCards } from ".";
import { ScryCardSymbol, ScrySet } from "../Utility/Scry/Types";

type AddCard = {
    type: "AddCard";
    card: Scry.Card;
};

type AddSymbols = {
    type: "AddSymbols";
    symbols: ScryCardSymbol[];
};

type AddSets = {
    type: "AddSets";
    sets: ScrySet[];
};

type CreateDeck = {
    type: "CreateDeck";
    name: string;
    link: string;
    previewUrl?: string;
    cards?: DeckCards;
};

type UpdateDeck = {
    type: "UpdateDeck";
    name: string;
    previewUrl?: string;
    cards?: DeckCards;
    isDirty?: boolean;
};

type UpdateDeckCard = {
    type: "UpdateDeckCard";
    deckName: string;
    sectionName: string;
    card: DeckCard;
};

type DeleteDeck = {
    type: "DeleteDeck";
    name: string;
};

type SelectDeck = {
    type: "SelectDeck";
    name: string | null;
};

export type Action = AddCard | AddSymbols | AddSets | CreateDeck | UpdateDeck | UpdateDeckCard | DeleteDeck | SelectDeck;
