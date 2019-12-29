import { Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Deck, DeckName, getDeckName, State } from "../../State";
import { DrawerAvatar } from "../Styled/Grid";
import styled from "../Styled/Theme";
import DeckAvatar from "./DeckAvatar";

const StyledItemText = styled(ListItemText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type Props = {
    open: boolean;
};

const DrawerDeckList: React.FC<Props> = ({ open }) => {
    const { pathname } = useLocation();
    const [state] = React.useContext(State);

    const renderItem = (deck: Deck) => (
        <Tooltip key={deck.name} title={open ? "" : (state.decks[deck.name].isDirty ? "*" : "") + getDeckName(deck.name)} placement="right">
            <ListItem
                component={Link}
                to={`/decks/${encodeURIComponent(deck.name)}`}
                button
                selected={state.selectedDeck === deck.name && !pathname.match("/addDeck")}
            >
                <ListItemAvatar>
                    <DeckAvatar deck={deck} />
                </ListItemAvatar>
                <StyledItemText primary={getDeckName(deck.name)} />
            </ListItem>
        </Tooltip>
    );

    return (
        <>
            <List>
                {renderItem(state.decks[DeckName.Collection])}
                {renderItem(state.decks[DeckName.Wishlist])}
            </List>
            <Divider />
            <List>
                <Tooltip title="Add deck" placement="right">
                    <ListItem component={Link} to="/addDeck/" button selected={!!pathname.match("/addDeck")}>
                        <ListItemAvatar>
                            <DrawerAvatar alt="Add deck">
                                <AddCircleOutlineIcon />
                            </DrawerAvatar>
                        </ListItemAvatar>
                        <StyledItemText primary="Add deck" />
                    </ListItem>
                </Tooltip>
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
