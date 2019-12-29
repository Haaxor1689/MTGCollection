import { Avatar, Badge } from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Deck, DeckName, getDeckName, State } from "../../State";
import styled from "../Styled/Theme";

const StyledAvatar = styled(Avatar)`
    background-color: ${p => p.theme.palette.background.paper};
    color: ${p => p.theme.palette.text.secondary};
`;

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
            <StyledAvatar alt={getDeckName(deck.name)} src={deck.previewUrl}>
                {getDeckIcon(deck.name)}
            </StyledAvatar>
        </Badge>
    );
};
export default DeckAvatar;
