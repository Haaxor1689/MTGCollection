import { List, ListItem, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DrawerAvatar } from "../Styled/Grid";
import { LifecounterIcon } from "../Styled/Icons";
import styled from "../Styled/Theme";

const StyledItemText = styled(ListItemText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type Props = {
    closeDrawer: () => void;
};

const DrawerApps: React.FC<Props> = ({ closeDrawer }) => {
    const { pathname } = useLocation();

    return (
        <List>
            <Tooltip title="Lifecounter" placement="right">
                <ListItem component={Link} to="/lifecounter" onClick={closeDrawer} button selected={!!pathname.match(/^\/lifecounter$/)}>
                    <ListItemAvatar>
                        <DrawerAvatar alt="Lifecounter">
                            <LifecounterIcon />
                        </DrawerAvatar>
                    </ListItemAvatar>
                    <StyledItemText primary="Lifecounter" />
                </ListItem>
            </Tooltip>
        </List>
    );
};

export default DrawerApps;
