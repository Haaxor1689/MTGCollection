import React from "react";
import { IconButtonProps } from "@material-ui/core/IconButton";
import { CollectionCardProps } from "../CollectionPreview";
import useCardActions from "../../../Utility/useCardAction";
import WishlistButton from "./WishlistButton";
import ChangeSectionButton from "./ChangeSectionButton";
import DeleteButton from "./DeleteButton";
import OpenScryfallButton from "./OpenScryfallButton";

type Props = {
    size?: IconButtonProps["size"];
    className?: string;
} & CollectionCardProps;

const CardActions: React.FC<Props> = ({ size, className, ...props}) => {
    const actions = useCardActions(props);
    return (
        <div className={className}>
            <WishlistButton actions={actions} size={size} />
            <ChangeSectionButton actions={actions} size={size} />
            <DeleteButton actions={actions} size={size} />
            <OpenScryfallButton actions={actions} size={size} />
        </div>
    );
};
export default CardActions;
