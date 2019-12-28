import { Avatar, Badge, Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Deck, DeckName, State } from "../State";
import styled from "./Styled/Theme";

const StyledAvatar = styled(Avatar)`
    background-color: ${p => p.theme.palette.background.paper};
    color: ${p => p.theme.palette.text.secondary};
`;

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

    const renderItem = (deck: Deck, name?: string, icon?: JSX.Element) => (
        <Tooltip key={deck.name} title={open ? "" : (state.decks[deck.name].isDirty ? "*" : "") + (name ?? deck.name)} placement="right">
            <ListItem button onClick={selectDeck(deck.name)} selected={state.selectedDeck === deck.name}>
                <ListItemAvatar>
                    <Badge
                        invisible={!state.decks[deck.name].isDirty}
                        color="primary"
                        overlap="circle"
                        badgeContent=" "
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <StyledAvatar alt={name ?? deck.name} src={deck.previewUrl}>
                            {icon ?? <CollectionsIcon />}
                        </StyledAvatar>
                    </Badge>
                </ListItemAvatar>
                <StyledItemText primary={name ?? deck.name} />
            </ListItem>
        </Tooltip>
    );

    return (
        <>
            <List>
                {renderItem(state.decks[DeckName.Collection], "Collection")}
                {renderItem(state.decks[DeckName.Wishlist], "Wishlist", <FavoriteIcon />)}
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
