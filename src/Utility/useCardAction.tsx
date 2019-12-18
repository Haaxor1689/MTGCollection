import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import { isNullOrUndefined } from "util";
import { CollectionCardProps } from "../Components/Display/CollectionPreview";
import { DeckName, SectionName, State } from "../State";
import assert from "./Assert";

const useCardActions = ({ card, deckName, sectionName }: CollectionCardProps) => {
    const [state, dispatch] = React.useContext(State);

    const isOnWishlist = () => state.decks[DeckName.Wishlist].cards[SectionName.Default][card.name] !== undefined;
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
    } as const;
};
export default useCardActions;
