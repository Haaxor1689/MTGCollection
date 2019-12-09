import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { DeckName, State } from "../State";

const DrawerDeckList: React.FC = () => {
    const [state, dispatch] = React.useContext(State);
    const selectDeck = (name: string) => () => {
        dispatch({ type: "SelectDeck", name });
    };
    return (
        <>
            <List>
                <ListItem button onClick={selectDeck(DeckName.Collection)}>
                    <ListItemIcon>
                        <CollectionsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Collection" />
                </ListItem>
                <ListItem button onClick={selectDeck(DeckName.Wishlist)}>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" />
                </ListItem>
            </List>
            <Divider />
            <List>
                {Object.values(state.decks)
                    .filter(deck => deck.name !== DeckName.Collection && deck.name !== DeckName.Wishlist)
                    .map(deck => (
                        <ListItem button key={deck.name} onClick={selectDeck(deck.name)}>
                            <ListItemIcon>{deck.previewUrl ? <Avatar alt={deck.name} src={deck.previewUrl} /> : <CollectionsIcon />}</ListItemIcon>
                            <ListItemText primary={deck.name} />
                        </ListItem>
                    ))}
            </List>
        </>
    );
};

export default DrawerDeckList;
