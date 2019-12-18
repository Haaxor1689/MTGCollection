import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { DeckName, State } from "../State";
import styled from "./Styled/Theme";

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

    return (
        <>
            <List>
                <Tooltip title={open ? "" : "Collection"} placement="right">
                    <ListItem button onClick={selectDeck(DeckName.Collection)}>
                        <ListItemAvatar>
                            <Avatar alt="Collection">
                                <CollectionsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <StyledItemText primary="Collection" />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "Wishlist"} placement="right">
                    <ListItem button onClick={selectDeck(DeckName.Wishlist)}>
                        <ListItemAvatar>
                            <Avatar alt="Wishlist">
                                <FavoriteIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <StyledItemText primary="Wishlist" />
                    </ListItem>
                </Tooltip>
            </List>
            <Divider />
            <List>
                {Object.values(state.decks)
                    .filter(deck => deck.name !== DeckName.Collection && deck.name !== DeckName.Wishlist)
                    .map(deck => (
                        <Tooltip key={deck.name} title={open ? "" : deck.name} placement="right">
                            <ListItem button onClick={selectDeck(deck.name)}>
                                <ListItemAvatar>
                                    <Avatar alt={deck.name} src={deck.previewUrl}>
                                        <CollectionsIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <StyledItemText primary={deck.name} />
                            </ListItem>
                        </Tooltip>
                    ))}
            </List>
        </>
    );
};

export default DrawerDeckList;
