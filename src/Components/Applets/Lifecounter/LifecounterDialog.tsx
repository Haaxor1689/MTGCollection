import { Dialog, IconButton, useMediaQuery } from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import RefreshIcon from "@material-ui/icons/Refresh";
import SettingsIcon from "@material-ui/icons/Settings";
import NoSleep from "nosleep.js";
import React from "react";
import { Flex } from "reflexbox";
import { LifecounterState } from "../../../State/Lifecounter";
import { AppletActions } from "../../Styled/Grid";
import styled, { MainTheme } from "../../Styled/Theme";
import TooltipButton from "../../Styled/TooltipButton";
import PlayerCard from "./PlayerCard";

const OptionsButton = styled(IconButton)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const LifecounterDialog: React.FC = () => {
    const isMobile = useMediaQuery(MainTheme.breakpoints.down("xs"));
    const [open, setOpen] = React.useState(false);
    const [optionsOpen, setOptionsOpen] = React.useState(false);

    const [state, dispatch] = React.useContext(LifecounterState);

    var noSleep = React.useMemo(() => new NoSleep(), []);
    React.useEffect(() => () => noSleep.disable(), [noSleep]);

    const handleOpen = () => {
        noSleep.enable();
        restartGame();
        setOpen(true);
    };

    const handleClose = () => {
        noSleep.disable();
        setOpen(false);
        setOptionsOpen(false);
    };

    const handleOptionsOpen = () => {
        setOptionsOpen(true);
    };

    const handleOptionsClose = () => {
        setOptionsOpen(false);
    };

    const setStartingPlayer = () => {
        dispatch({ type: "SetStartingPlayer", player: Math.round(Math.random() * (state.players.length - 1)) });
        handleOptionsClose();
    };

    const restartGame = () => {
        dispatch({ type: "Restart" });
        setStartingPlayer();
    };

    return (
        <>
            <AppletActions>
                <TooltipButton title="Start match" onClick={handleOpen} background="primary">
                    <PlayArrowIcon />
                </TooltipButton>
            </AppletActions>
            <Dialog fullScreen={isMobile} open={open} onClose={handleClose}>
                <Flex flexWrap="wrap" width={isMobile ? "100%" : "550px"} height={isMobile ? "100%" : "900px"}>
                    {state.players.map((_, i) => (
                        <PlayerCard key={i} player={i} />
                    ))}
                </Flex>

                <OptionsButton onClick={handleOptionsOpen}>
                    <SettingsIcon />
                </OptionsButton>
                <Dialog open={optionsOpen} onClose={handleOptionsClose}>
                    <IconButton onClick={restartGame}>
                        <RefreshIcon />
                    </IconButton>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton onClick={setStartingPlayer}>
                        <CasinoIcon />
                    </IconButton>
                </Dialog>
            </Dialog>
        </>
    );
};
export default LifecounterDialog;
