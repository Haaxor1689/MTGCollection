import { Badge } from "@material-ui/core";
import { AvatarProps } from "@material-ui/core/Avatar";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Deck, DeckName, getDeckName } from "../../State";
import { DrawerAvatar } from "../Styled/Grid";

const getDeckIcon = (name: string) => {
    return name === DeckName.Wishlist ? <FavoriteIcon /> : <CollectionsIcon />;
};

type Props = {
    deck: Deck;
    variant?: AvatarProps["variant"];
};

const DeckAvatar: React.FC<Props> = ({ deck, variant }) => {
    return (
        <Badge
            invisible={!deck?.isDirty}
            color="primary"
            overlap="circle"
            badgeContent=" "
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <DrawerAvatar variant={variant} alt={getDeckName(deck?.name)} src={deck?.previewUrl}>
                {getDeckIcon(deck?.name)}
            </DrawerAvatar>
        </Badge>
    );
};
export default DeckAvatar;
