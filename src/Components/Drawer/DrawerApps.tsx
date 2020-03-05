import { List, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RouteNames } from "../../Routes/Routes";
import { DrawerAvatar } from "../Styled/Grid";
import { LifecounterIcon } from "../Styled/Icons";
import styled from "../Styled/Theme";
import DrawerSubtitle from "./DrawerSubtitle";

const StyledItemText = styled(ListItemText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type Props = {
    open: boolean;
    closeDrawer: () => void;
};

const DrawerApps: React.FC<Props> = ({ open, closeDrawer }) => {
    const { pathname } = useLocation();

    return (
        <>
            <DrawerSubtitle open={open}>Apps</DrawerSubtitle>
            <List>
                <Tooltip title="Lifecounter" placement="right">
                    <ListItem component={Link} to={RouteNames.Lifecounter} onClick={closeDrawer} button selected={!!pathname.match(/^\/lifecounter$/)}>
                        <ListItemAvatar>
                            <DrawerAvatar alt="Lifecounter">
                                <LifecounterIcon />
                            </DrawerAvatar>
                        </ListItemAvatar>
                        <StyledItemText primary="Lifecounter" />
                    </ListItem>
                </Tooltip>
            </List>
        </>
    );
};

export default DrawerApps;
