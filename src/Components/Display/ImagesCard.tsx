import { Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { isNullOrUndefined } from "util";
import Scry from "../../Utility/Scry";
import useCardActions from "../../Utility/useCardAction";
import IncrementNumber from "../Styled/IncrementNumber";
import styled from "../Styled/Theme";
import TooltipButton from "../Styled/TooltipButton";
import { CollectionCardProps } from "./CollectionPreview";

const Body = styled.div`
    padding-bottom: 139.344262295%;
    width: 100%;
    height: 0;
    position: relative;
`;

const Image = styled.img`
    border-radius: 4.75% / 3.5%;
    background-image: repeating-linear-gradient(-55deg, #ddd, #ddd 5px, #ccc 5px, #ccc 10px);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const IncrementActions = styled.div`
    position: absolute;
    top: 25%;
    left: ${p => p.theme.spacing(2)}px;
`;

const BottomActions = styled.div`
    position: absolute;
    bottom: ${p => p.theme.spacing(2)}px;
    right: ${p => p.theme.spacing(2)}px;

    display: flex;
    align-items: center;

    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    ${Body}:hover & {
        opacity: 1;
    }
`;

const ActionsMenu = styled.div<{ open: boolean }>`
    transform: scaleX(${p => (p.open ? 1 : 0)});
    transition: all 0.2s ease-in-out;

    & > * {
        margin-right: ${p => p.theme.spacing(1)}px;
    }
`;

const ImagesCard: React.FC<CollectionCardProps> = props => {
    const actions = useCardActions(props);
    const { card } = props;

    const [actionsOpen, setActionsOpen] = React.useState(false);
    const toggleActionsOpen = () => setActionsOpen(prev => !prev);

    return (
        <Body>
            <Image src={Scry.getImage(card, "normal") ?? ""} onClick={actions.openScryfallPage} title="Open on scryfall" />
            {!isNullOrUndefined(card.amount) && (
                <IncrementActions>
                    <IncrementNumber val={card.amount} onChange={actions.updateCardQuantity} />
                </IncrementActions>
            )}
            <BottomActions>
                <ActionsMenu open={actionsOpen}>
                    <TooltipButton title={actions.wishlistTooltip()} onClick={actions.toggleWishlist} background="secondary">
                        {actions.wishlistIcon()}
                    </TooltipButton>
                    <TooltipButton title="Remove card" onClick={actions.removeCard} background="secondary">
                        <DeleteIcon />
                    </TooltipButton>
                </ActionsMenu>
                <Fab color="primary" onClick={toggleActionsOpen}>
                    <MenuIcon />
                </Fab>
            </BottomActions>
        </Body>
    );
};
export default ImagesCard;
