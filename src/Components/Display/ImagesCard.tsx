import React from "react";
import { isNullOrUndefined } from "util";
import Scry from "../../Utility/Scry";
import IncrementNumber from "../Styled/IncrementNumber";
import styled from "../Styled/Theme";
import { CollectionCardProps, useCardActions } from "./CollectionPreview";

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

const Actions = styled.div`
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
`;

const ImagesCard: React.FC<CollectionCardProps> = props => {
    const [updateCardQuantity, openScryfallPage] = useCardActions(props);
    const { card } = props;

    return (
        <Body>
            <Image src={Scry.getImage(card, "normal") ?? ""} onClick={openScryfallPage} title="Open on scryfall" />
            {!isNullOrUndefined(card.amount) && (
                <Actions>
                    <IncrementNumber val={card.amount} onChange={updateCardQuantity} />
                </Actions>
            )}
        </Body>
    );
};
export default ImagesCard;
