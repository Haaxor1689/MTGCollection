import { Dialog, IconButton, useMediaQuery } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import NoSleep from "nosleep.js";
import React from "react";
import { Flex } from "reflexbox";
import { LifecounterState } from "../../../State/Lifecounter";
import { AppletActions } from "../../Styled/Grid";
import styled, { MainTheme } from "../../Styled/Theme";
import TooltipButton from "../../Styled/TooltipButton";
import PlayerCard from "./PlayerCard";

const CloseButton = styled(IconButton)`
    position: absolute;
    top: ${p => p.theme.spacing(1)}px;
    right: ${p => p.theme.spacing(1)}px;
`;

const LifecounterDialog: React.FC = () => {
    const isMobile = useMediaQuery(MainTheme.breakpoints.down("xs"));
    const [open, setOpen] = React.useState(false);

    const [state] = React.useContext(LifecounterState);

    var noSleep = React.useMemo(() => new NoSleep(), []);
    React.useEffect(() => () => noSleep.disable(), [noSleep]);

    const handleOpen = () => {
        noSleep.enable();
        setOpen(true);
    };

    const handleClose = () => {
        noSleep.disable();
        setOpen(false);
    };

    return (
        <>
            <AppletActions>
                <TooltipButton title="Start match" onClick={handleOpen} background="primary">
                    <PlayArrowIcon />
                </TooltipButton>
            </AppletActions>
            <Dialog fullScreen={isMobile} open={open} onClose={handleClose}>
                <Flex flexWrap="wrap" width={isMobile ? "100%" : "600px"} height={isMobile ? "100%" : "900px"}>
                    {state.players.map((_, i) => (
                        <PlayerCard key={i} player={i} />
                    ))}
                </Flex>
                <CloseButton onClick={handleClose}>
                    <CloseIcon />
                </CloseButton>
            </Dialog>
        </>
    );
};
export default LifecounterDialog;
