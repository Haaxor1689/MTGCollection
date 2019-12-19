import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import { isNullOrUndefined } from "util";
import { CollectionCardProps } from "../Components/Previews/CollectionPreview";
import { DeckName, SectionName, State } from "../State";
import assert from "./Assert";

const useCardActions = ({ card, deckName, sectionName }: CollectionCardProps) => {
    const [state, dispatch] = React.useContext(State);

    const targetDeck = deckName ?? state.selectedDeck ?? null;
    const isOnWishlist = () => state.decks[DeckName.Wishlist].cards[SectionName.Default][card.name] !== undefined;
    const sections = targetDeck ? Object.keys(state.decks[targetDeck].cards) : [];
    return {
        updateCardQuantity: (val: number) => {
            assert(!isNullOrUndefined(deckName), "DeckName should not be empty if the preview actions are Deck");
            dispatch({
                type: "UpdateDeckCard",
                deckName,
                sectionName: sectionName ?? SectionName.Default,
                card: {
                    ...card,
                    amount: val,
                },
            });
        },
        openScryfallPage: () => card.scryfall_uri && window.open(card.scryfall_uri, "_blank"),
        isOnWishlist,
        toggleWishlist: () =>
            isOnWishlist()
                ? dispatch({
                    type: "UpdateDeckCard",
                    deckName: DeckName.Wishlist,
                    sectionName: SectionName.Default,
                    card: {
                        ...card,
                        amount: 0,
                    },
                })
                : dispatch({
                    type: "UpdateDeckCard",
                    deckName: DeckName.Wishlist,
                    sectionName: SectionName.Default,
                    card: {
                        ...card,
                        amount: 1,
                    },
                }),
        wishlistTooltip: () => (isOnWishlist() ? "Remove from wishlist" : "Add to wishlist"),
        wishlistIcon: () => (isOnWishlist() ? <FavoriteIcon /> : <FavoriteBorderIcon />),
        removeCard: () => {
            assert(!isNullOrUndefined(deckName), "DeckName should not be empty if the preview actions are Deck");
            dispatch({
                type: "UpdateDeckCard",
                deckName,
                sectionName: sectionName ?? SectionName.Default,
                card: {
                    ...card,
                    amount: 0,
                },
            });
        },
        sections,
        changeSection: (newSection: string) => {
            assert(!isNullOrUndefined(deckName), "DeckName should not be empty if the preview actions are Deck");
            dispatch({
                type: "UpdateDeckCard",
                deckName,
                sectionName: sectionName ?? SectionName.Default,
                card: {
                    ...card,
                    amount: 0,
                },
            });
            dispatch({
                type: "UpdateDeckCard",
                deckName,
                sectionName: newSection,
                card: {
                    ...card,
                    amount: card.amount,
                },
            });
        },
        addToDeck: (section: string = SectionName.Default) => {
            assert(!isNullOrUndefined(targetDeck), "TargetDeck should not be empty if the preview actions are SearchDeck");
            dispatch({
                type: "UpdateDeckCard",
                deckName: targetDeck,
                sectionName: section,
                card: {
                    ...card,
                    amount: 1,
                },
            });
        }
    } as const;
};
export default useCardActions;
