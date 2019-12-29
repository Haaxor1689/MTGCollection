import { Badge } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Deck, DeckName, getDeckName, State } from "../../State";
import { DrawerAvatar } from "../Styled/Grid";
import { AvatarProps } from "@material-ui/core/Avatar";

const getDeckIcon = (name: string) => {
    return name === DeckName.Wishlist ? <FavoriteIcon /> : <CollectionsIcon />;
};

type Props = {
    deck: Deck;
    variant?: AvatarProps["variant"];
};

const DeckAvatar: React.FC<Props> = ({ deck, variant }) => {
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
            <DrawerAvatar variant={variant} alt={getDeckName(deck.name)} src={deck.previewUrl}>
                {getDeckIcon(deck.name)}
            </DrawerAvatar>
        </Badge>
    );
};
export default DeckAvatar;
