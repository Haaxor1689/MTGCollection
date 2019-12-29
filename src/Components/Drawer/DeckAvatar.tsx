import { Badge } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Deck, DeckName, getDeckName, State } from "../../State";
import { DrawerAvatar } from "../Styled/Grid";

const getDeckIcon = (name: string) => {
    return name === DeckName.Wishlist ? <FavoriteIcon /> : <CollectionsIcon />;
};

type Props = {
    deck: Deck;
};

const DeckAvatar: React.FC<Props> = ({ deck }) => {
    const [state] = React.useContext(State);
    return (
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
            <DrawerAvatar alt={getDeckName(deck.name)} src={deck.previewUrl}>
                {getDeckIcon(deck.name)}
            </DrawerAvatar>
        </Badge>
    );
};
export default DeckAvatar;
