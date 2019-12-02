import { AppBar, Divider, Drawer, IconButton, Toolbar, Avatar, Typography, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { isNullOrUndefined } from "util";
import { initialState, State } from "../State";
import { reducer } from "../State/Reducers";
import GoogleApi, { GoogleProfile } from "../Utility/GoogleApi";
import Home from "./Home";
import NotFound from "./NotFound";
import SignIn from "./SignIn";
import SignInButton from "./SignInButton";
import { FlexCol } from "./Styled/Grid";
import styled, { css, MainTheme } from "./Styled/Theme";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const bodyOpen = css<any>`
    margin-left: ${p => p.theme.constants.drawerWidth};
    width: calc(100% - ${p => p.theme.constants.drawerWidth});
    transition: ${p =>
        p.theme.transitions.create(["width", "margin"], {
            easing: p.theme.transitions.easing.sharp,
            duration: p.theme.transitions.duration.enteringScreen,
        })};
`;

const bodyClose = css<any>`
    transition: ${p =>
        p.theme.transitions.create(["width", "margin"], {
            easing: p.theme.transitions.easing.sharp,
            duration: p.theme.transitions.duration.leavingScreen,
        })};
`;

const CustomAppBar = styled(AppBar)<{ open: boolean }>`
    z-index: ${p => p.theme.zIndex.drawer + 1};
    ${bodyClose}
    ${p => p.open && bodyOpen}
`;

const MenuButton = styled(IconButton)<{ open: boolean }>`
    margin-right: 36px;
    ${p =>
        p.open &&
        css`
            display: none;
        `}
`;

const drawerOpen = css<any>`
    width: ${p => p.theme.constants.drawerWidth};
    transition: ${p =>
        p.theme.transitions.create("width", {
            easing: p.theme.transitions.easing.sharp,
            duration: p.theme.transitions.duration.enteringScreen,
        })};
`;

const drawerClose = css<any>`
    transition: ${p =>
        p.theme.transitions.create("width", {
            easing: p.theme.transitions.easing.sharp,
            duration: p.theme.transitions.duration.leavingScreen,
        })};
    overflow-x: hidden;
    width: ${p => p.theme.spacing(7) + 1}px;
`;

const CustomDrawer = styled(Drawer).attrs(() => ({
    variant: "permanent",
}))<{ open?: boolean }>`
    width: ${p => p.theme.constants.drawerWidth};
    flex-shrink: 0;
    white-space: nowrap;
    ${p => (p.open ? drawerOpen : drawerClose)}

    .MuiDrawer-paper {
        ${p => (p.open ? drawerOpen : drawerClose)}
    }
`;

const DrawerToolbar = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: ${p => p.theme.spacing(0, 1)}px;
`;

const MainContent = styled.div<{ open: boolean }>`
    flex-grow: 1;
    padding: ${p => p.theme.spacing(3)}px;
    margin-left: ${p => p.theme.spacing(7) + 1}px;
    ${bodyClose}
    ${p => p.open && bodyOpen}
`;

const ProfileAvatar = styled.div`
    margin-right: ${p => p.theme.spacing(1)}px;
`;

const App: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [profile, setProfile] = React.useState<GoogleProfile>();
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    const handleSignoutClick = () => {
        GoogleApi.signOut();
        setProfile(undefined);
    };

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    /**
     * Called at app init, sets Google API signin callback
     * info stored in React profile state
     */
    React.useEffect(() => {
        GoogleApi.initClient(async (isSignedIn: boolean) => {
            setIsSignedIn(isSignedIn);
            if (!isSignedIn) {
                return;
            }
            setProfile(GoogleApi.getProfile());
            GoogleApi.prepareAppData()(dispatch);
        });
    }, []);

    return (
        <State.Provider value={[state, dispatch]}>
            <CustomAppBar position="sticky" open={open}>
                <Toolbar>
                    <MenuButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" open={open}>
                        <MenuIcon />
                    </MenuButton>
                    <Typography variant="h6">MTGCollection</Typography>
                    <FlexCol />
                    {isSignedIn ? (
                        <>
                            {!isNullOrUndefined(profile) && (
                                <ProfileAvatar>
                                    <Tooltip title={`Signed in as ${profile.getGivenName()} (${profile.getEmail()})`}>
                                        <Avatar alt={profile.getGivenName()} src={profile.getImageUrl()} />
                                    </Tooltip>
                                </ProfileAvatar>
                            )}
                            <IconButton onClick={handleSignoutClick}>
                                <ExitToAppIcon />
                                <Typography variant="srOnly">SignOut</Typography>
                            </IconButton>
                        </>
                    ) : (
                        <SignInButton onClick={GoogleApi.signIn} />
                    )}
                </Toolbar>
            </CustomAppBar>
            <CustomDrawer open={open}>
                <DrawerToolbar>
                    <IconButton onClick={handleDrawerClose}>{MainTheme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
                </DrawerToolbar>
                <Divider />
                {/* {Drawer content} */}
            </CustomDrawer>
            <MainContent open={open}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Redirect to={isSignedIn ? "/" : "/signin/"} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signin/" component={SignIn} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </MainContent>
        </State.Provider>
    );
};

export default App;
