import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import React from "react";
import styled from "../../Styled/Theme";
import { SortByOptions, SortOrderOptions } from "../CollectionPreview";

const Body = styled.div`
    margin-bottom: ${p => p.theme.spacing(1)}px;
`;

type Props = {
    sortBy: SortByOptions;
    setSortBy: (sortBy: SortByOptions) => void;
    sortOrder: SortOrderOptions;
    setSortOrder: (sortOrder: SortOrderOptions) => void;
};

const SortToggle: React.FC<Props> = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => setOpen(prevOpen => !prevOpen);
    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Body>
            <Button ref={anchorRef} size="small" onClick={handleToggle} startIcon={<SortIcon />}>
                Sort by
            </Button>
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
                                    {([
                                        ["Name", "Asc"],
                                        ["Name", "Desc"],
                                        ["Cmc", "Asc"],
                                        ["Cmc", "Desc"],
                                        ["Type", "Asc"],
                                        ["Type", "Desc"],
                                        ["Rarity", "Asc"],
                                        ["Rarity", "Desc"],
                                    ] as const).map(([by, order]) => (
                                        <MenuItem
                                            key={`${by} (${order})`}
                                            selected={by === sortBy && order === sortOrder}
                                            onClick={event => {
                                                setSortBy(by);
                                                setSortOrder(order);
                                            }}
                                        >
                                            {`${by} (${order})`}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Body>
    );
};
export default SortToggle;
