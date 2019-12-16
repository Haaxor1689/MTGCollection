import React from "react";
import Scry from "../../Utility/Scry";
import styled from "../Styled/Theme";
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
`;

const ImagesCard: React.FC<CollectionCardProps> = ({ card }) => {
    return (
        <Body>
            <Image src={Scry.getImage(card, "normal") ?? ""} />
        </Body>
    );
};
export default ImagesCard;
