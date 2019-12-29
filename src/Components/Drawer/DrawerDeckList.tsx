import { Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import React from "react";
import { Deck, DeckName, getDeckName, State } from "../../State";
import styled from "../Styled/Theme";
import DeckAvatar from "./DeckAvatar";
import { Link } from "react-router-dom";

const StyledItemText = styled(ListItemText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type Props = {
    open: boolean;
};

const DrawerDeckList: React.FC<Props> = ({ open }) => {
    const [state, dispatch] = React.useContext(State);
    const selectDeck = (name: string) => () => {
        dispatch({ type: "SelectDeck", name });
    };

    const renderItem = (deck: Deck) => (
        <Link key={deck.name} to="/">
            <Tooltip title={open ? "" : (state.decks[deck.name].isDirty ? "*" : "") + getDeckName(deck.name)} placement="right">
                <ListItem button onClick={selectDeck(deck.name)} selected={state.selectedDeck === deck.name}>
                    <ListItemAvatar>
                        <DeckAvatar deck={deck} />
                    </ListItemAvatar>
                    <StyledItemText primary={getDeckName(deck.name)} />
                </ListItem>
            </Tooltip>
        </Link>
    );

    return (
        <>
            <List>
                {renderItem(state.decks[DeckName.Collection])}
                {renderItem(state.decks[DeckName.Wishlist])}
            </List>
            <Divider />
            <List>
                {Object.values(state.decks)
                    .filter(deck => deck.name !== DeckName.Collection && deck.name !== DeckName.Wishlist)
                    .map(deck => renderItem(deck))}
            </List>
        </>
    );
};

export default DrawerDeckList;
