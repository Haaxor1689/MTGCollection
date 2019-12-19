import { IconButtonProps } from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import useCardActions from "../../../Utility/useCardAction";
import TooltipButton from "../../Styled/TooltipButton";

type Props = {
    actions: ReturnType<typeof useCardActions>;
    size?: IconButtonProps["size"];
    background?: "primary" | "secondary";
};

const DeleteButton: React.FC<Props> = ({ actions, size, background }) => {
    return (
        <TooltipButton title="Remove card" onClick={actions.removeCard} background={background} size={size}>
            <DeleteIcon />
        </TooltipButton>
    );
};
export default DeleteButton;
