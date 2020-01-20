import { Avatar, Paper, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CollectionsIcon from "@material-ui/icons/Collections";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Link } from "react-router-dom";
import { AppState, Deck, DeckName, getDeckName, SectionName } from "../../State";
import Scry from "../../Utility/Scry";
import SymbolTypography from "../Styled/SymbolTypography";
import styled, { css } from "../Styled/Theme";

const DeckBoxBody = styled.div`
    padding-bottom: 65%;
    width: 100%;
    height: 0;
    position: relative;
`;

const DeckBoxAvatar = styled(Avatar)`
    background-color: ${p => p.theme.palette.background.default};
    color: ${p => p.theme.palette.text.secondary};
    border-radius: ${p => p.theme.spacing(4)}px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const DeckBoxTitle = styled(Paper)`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: ${p => p.theme.spacing(1, 2)};
    background-color: ${p => p.theme.palette.grey[900]};
    border-radius: ${p => p.theme.spacing(4)}px;

    & .MuiTypography-root {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const DeckColorIdentity = styled.div`
    position: absolute;
    top: -75%;
    right: 50%;
    transform: translateX(50%);
`;

const LargeIcon = css`
    width: 50%;
    height: 50%;
`;

const LargeFavoriteIcon = styled(FavoriteIcon)`
    ${LargeIcon}
`;
const LargeCollectionsIcon = styled(CollectionsIcon)`
    ${LargeIcon}
`;
const LargeAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
    ${LargeIcon}
`;

const getDeckIcon = (name: string) => {
    return name === DeckName.Wishlist ? <LargeFavoriteIcon /> : <LargeCollectionsIcon />;
};

type Props = {
    deck?: Deck;
};

const DeckBox: React.FC<Props> = ({ deck }) => {
    const [state] = React.useContext(AppState);
    if (!deck) {
        return (
            <DeckBoxBody>
                <Link to="/addDeck">
                    <DeckBoxAvatar variant="rounded" alt="Add deck">
                        <LargeAddCircleOutlineIcon />
                    </DeckBoxAvatar>
                </Link>
            </DeckBoxBody>
        );
    }
    return (
        <DeckBoxBody>
            <Link to={`/decks/${encodeURIComponent(deck.name)}`}>
                <DeckBoxAvatar variant="rounded" alt={getDeckName(deck.name)} src={deck.previewUrl}>
                    {getDeckIcon(deck.name)}
                </DeckBoxAvatar>
                <DeckBoxTitle>
                    {deck.name !== DeckName.Collection && deck.name !== DeckName.Wishlist && (
                        <DeckColorIdentity>
                            <SymbolTypography
                                variant="h3"
                                text={Scry.getColorIdentity(...Object.keys(deck.cards[SectionName.Default]).map(c => state.cardList[c]))}
                            />
                        </DeckColorIdentity>
                    )}
                    <Typography variant="h6">{getDeckName(deck.name)}</Typography>
                </DeckBoxTitle>
            </Link>
        </DeckBoxBody>
    );
};
export default DeckBox;
