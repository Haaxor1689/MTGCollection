import { IconButtonProps } from "@material-ui/core/IconButton";
import React from "react";
import { ReactComponent as ScryfallIcon } from "../../../Assets/scryfallLogo.svg";
import useCardActions from "../../../Utility/useCardAction";
import TooltipButton from "../../Styled/TooltipButton";


type Props = {
    actions: ReturnType<typeof useCardActions>;
    size?: IconButtonProps["size"];
    background?: "primary" | "secondary";
};

const OpenScryfallButton: React.FC<Props> = ({ actions, size, background }) => {
    return (
        <TooltipButton title="Open on scryfall" onClick={actions.openScryfallPage} background={background} size={size}>
            <ScryfallIcon width="24" height="24" />
        </TooltipButton>
    );
};
export default OpenScryfallButton;
