import { Popper } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { isNullOrUndefined } from "util";
import { PxFromAvatarSize } from "../../Utility";
import Scry from "../../Utility/Scry";
import useCardActions from "../../Utility/useCardAction";
import IncrementNumber from "../Styled/IncrementNumber";
import styled from "../Styled/Theme";
import TooltipButton from "../Styled/TooltipButton";
import ChangeSectionButton from "./ActionButtons/ChangeSectionButton";
import DeleteButton from "./ActionButtons/DeleteButton";
import WishlistButton from "./ActionButtons/WishlistButton";
import { CollectionCardProps } from "./CollectionPreview";

const imageCardActionsHeight = 48;

const Body = styled.div`
    padding-bottom: 139.344262295%;
    width: 100%;
    height: 0;
    position: relative;
    margin-top: ${p => imageCardActionsHeight + p.theme.spacing(1) * 2}px;
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

const CardActions = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-${p => imageCardActionsHeight + p.theme.spacing(1) * 2}px);
    border-top-left-radius: ${imageCardActionsHeight / 2}px;
    border-top-right-radius: ${imageCardActionsHeight / 2}px;
    height: ${imageCardActionsHeight * 2}px;
    background-color: ${p => p.theme.palette.background.default};

    display: flex;
    justify-content: space-between;
    padding: ${p => p.theme.spacing(1)}px;
`;

const ActionsMenu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${p => p.theme.palette.grey[600]};
    border-radius: ${p => PxFromAvatarSize(undefined)}px;
    transform: translateY(${p => p.theme.spacing(2)}px);
`;

const ImagesCard: React.FC<CollectionCardProps> = props => {
    const actions = useCardActions(props);
    const { card } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const actionsOpen = !!anchorEl;
    const toggleActionsOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(!anchorEl ? e.currentTarget : null);

    return (
        <Body>
            <CardActions>
                {!isNullOrUndefined(card.amount) && <IncrementNumber val={card.amount} onChange={actions.updateCardQuantity} />}
                <TooltipButton title="Actions" onClick={toggleActionsOpen}>
                    <MenuIcon />
                </TooltipButton>
                <Popper open={actionsOpen} anchorEl={anchorEl}>
                    <ActionsMenu>
                        <WishlistButton actions={actions} />
                        <ChangeSectionButton actions={actions} />
                        <DeleteButton actions={actions} />
                    </ActionsMenu>
                </Popper>
            </CardActions>
            <Image src={Scry.getImage(card, "normal") ?? ""} onClick={actions.openScryfallPage} title="Open on scryfall" />
        </Body>
    );
};
export default ImagesCard;
