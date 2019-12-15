import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { DeckName, State } from "../State";

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
                        <ListItemIcon>
                            <CollectionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Collection" />
                    </ListItem>
                </Tooltip>
                <Tooltip title={open ? "" : "Wishlist"} placement="right">
                    <ListItem button onClick={selectDeck(DeckName.Wishlist)}>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Wishlist" />
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
                                <ListItemIcon>{deck.previewUrl ? <Avatar alt={deck.name} src={deck.previewUrl} /> : <CollectionsIcon />}</ListItemIcon>
                                <ListItemText primary={deck.name} />
                            </ListItem>
                        </Tooltip>
                    ))}
            </List>
        </>
    );
};

export default DrawerDeckList;
