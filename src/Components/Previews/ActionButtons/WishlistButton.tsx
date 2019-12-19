import { IconButtonProps } from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import useCardActions from "../../../Utility/useCardAction";
import TooltipButton from "../../Styled/TooltipButton";

type Props = {
    actions: ReturnType<typeof useCardActions>;
    size?: IconButtonProps["size"];
    background?: "primary" | "secondary";
};

const WishlistButton: React.FC<Props> = ({ actions, size, background }) => {
    return (
        <TooltipButton title={actions.wishlistTooltip()} onClick={actions.toggleWishlist} background={background} size={size}>
            {actions.isOnWishlist() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </TooltipButton>
    );
};
export default WishlistButton;
