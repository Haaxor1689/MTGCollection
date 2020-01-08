import React from "react";
import { isNullOrUndefined } from "util";
import { PxFromAvatarSize } from "../../Utility";
import Scry from "../../Utility/Scry";
import useCardActions from "../../Utility/useCardAction";
import IncrementNumber from "../Styled/IncrementNumber";
import styled from "../Styled/Theme";
import CardActions from "./ActionButtons/CardActions";
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

const Actions = styled(CardActions)`
    position: absolute;
    top: ${p => p.theme.spacing(1)}px;
    right: ${p => p.theme.spacing(1)}px;
    display: flex;
    flex-direction: column;
    background-color: ${p => p.theme.palette.grey[600]};
    border-radius: ${PxFromAvatarSize(undefined)}px;

    display: none;
    ${Body}:hover & {
        display: flex;
    }
`;

const StyledIncrement = styled(IncrementNumber)`
    position: absolute;
    top: ${p => p.theme.spacing(7)}px;
    left: ${p => p.theme.spacing(3)}px;
    background-color: ${p => p.theme.palette.background.default};
`;

const ImagesCard: React.FC<CollectionCardProps> = props => {
    const actions = useCardActions(props);
    const { card } = props;

    return (
        <Body>
            <Image src={Scry.getImage(card, "normal") ?? ""} title={card.name} />
            {!isNullOrUndefined(card.amount) && <StyledIncrement val={card.amount} onChange={actions.updateCardQuantity} />}
            <Actions {...props} />
        </Body>
    );
};
export default ImagesCard;
