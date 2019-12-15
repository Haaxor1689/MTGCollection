import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { IconButtonProps } from "@material-ui/core/IconButton/IconButton";
import React from "react";

type Props = {
    onClick: () => void;
    title: string;
    size?: IconButtonProps["size"];
};

const TooltipButton: React.FC<Props> = ({ onClick, title, size, children }) => {
    return (
        <Tooltip title={title}>
            <IconButton size={size} onClick={onClick} aria-label={title}>
                {children}
                <Typography variant="srOnly">{title}</Typography>
            </IconButton>
        </Tooltip>
    );
};

export default TooltipButton;
