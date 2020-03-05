import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { RouteNames } from "../../Routes/Routes";
import { AppState, getDeckName } from "../../State";
import styled from "../Styled/Theme";
import DeckAvatar from "./DeckAvatar";

const StyledNavigation = styled(BottomNavigation)`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: ${p => p.theme.palette.secondary.dark};
`;

const DeckAction = styled(BottomNavigationAction)`
    flex-grow: 10;

    & .MuiBottomNavigationAction-label {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const DeckIcon = styled.div`
    height: 24px;
    width: 24px;
    position: relative;

    & > * {
        position: absolute;
        bottom: 0;
        transform: translateX(-50%);
    }
`;

type Props = {
    open: boolean;
    toggleOpen: () => void;
};

const MobileNavigation: React.FC<Props> = ({ open, toggleOpen }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const [state] = React.useContext(AppState);
    const [value, setValue] = React.useState(0);

    React.useEffect(() => setValue(open ? 2 : pathname.match(RouteNames.AddDeck) ? 0 : 1), [open, pathname]);

    const onChange = (tab: number) => {
        setValue(tab);
        switch (tab) {
            case 0:
                history.push(RouteNames.AddDeck);
                return;
            case 1:
                history.push(RouteNames.Deck(encodeURIComponent(state.decks[state.selectedDeck].name)));
                return;
            case 2:
                toggleOpen();
                return;
        }
        throw Error(`Invalid tab number ${tab}`);
    };

    return (
        <StyledNavigation value={value} onChange={(_, val) => onChange(val)} showLabels>
            <BottomNavigationAction label="Add deck" icon={<AddCircleOutlineIcon />} />
            <DeckAction
                label={getDeckName(state.selectedDeck)}
                icon={
                    <DeckIcon>
                        <DeckAvatar deck={state.decks[state.selectedDeck]} />
                    </DeckIcon>
                }
            />
            <BottomNavigationAction label="Menu" icon={<MenuIcon />} />
        </StyledNavigation>
    );
};
export default MobileNavigation;
