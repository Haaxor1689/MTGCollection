import { IconButtonProps } from "@material-ui/core/IconButton";
import React from "react";
import useCardActions from "../../../Utility/useCardAction";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import TooltipButton from "../../Styled/TooltipButton";
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import { SectionName } from "../../../State";

type Props = {
    actions: ReturnType<typeof useCardActions>;
    size?: IconButtonProps["size"];
    background?: "primary" | "secondary";
};

const ChangeSectionButton: React.FC<Props> = ({ actions, size, background }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleToggle = () => setOpen(prevOpen => !prevOpen);
    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <span ref={anchorRef}>
                <TooltipButton title="Change section" onClick={handleToggle} disabled={actions.sections.length <= 0} background={background} size={size}>
                    <SwapVertIcon />
                </TooltipButton>
            </span>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper elevation={5}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    {(actions.sections).map(s => (
                                        <MenuItem
                                            key={s}
                                            onClick={() => actions.changeSection(s)}
                                        >
                                            {s === SectionName.Default ? "Default" : s}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};
export default ChangeSectionButton;
