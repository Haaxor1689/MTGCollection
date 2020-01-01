import { AppBar, Avatar, ClickAwayListener, Container, Divider, Drawer, IconButton, Link as MUILink, Toolbar, Tooltip, Typography, useMediaQuery } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import Axios, { AxiosResponse } from "axios";
import React from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { isNullOrUndefined } from "util";
import { initialState, State } from "../State";
import { reducer } from "../State/Reducers";
import GoogleApi, { GoogleProfile } from "../Utility/GoogleApi";
import Scry from "../Utility/Scry";
import { ScryCardSymbol, ScrySet } from "../Utility/Scry/Types";
import AddDeck from "./Applets/AddDeck";
import DeckPreview from "./Applets/DeckPreview";
import UserInfo from "./Applets/UserInfo";
import DrawerDeckList from "./Drawer/DrawerDeckList";
import MobileNavigation from "./Drawer/MobileNavigation";
import Home from "./Home";
import NotFound from "./NotFound";
import SignIn from "./SignIn";
import SignInButton from "./SignInButton";
import { FlexCol } from "./Styled/Grid";
import styled, { ComponentProps, css, MainTheme } from "./Styled/Theme";
import TooltipButton from "./Styled/TooltipButton";

const bodyOpen = css<ComponentProps<any>>`
    margin-left: ${p => p.theme.constants.drawerWidth};
    width: calc(100% - ${p => p.theme.constants.drawerWidth});
    transition: ${p =>
        p.theme.transitions.create(["width", "margin"], {
            easing: p.theme.transitions.easing.sharp,
            duration: p.theme.transitions.duration.enteringScreen,
        })};
`;

const bodyClose = css<ComponentProps<any>>`
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
    ${p =>
        p.open &&
        css`
            ${p.theme.breakpoints.down("xs")} {
                & {
                    width: 100%;
                    margin-left: 0;
                }
            }
        `}
`;

const MenuButton = styled(IconButton)<{ open: boolean }>`
    margin-right: 36px;
    ${p =>
        p.open &&
        css`
            display: none;
        `}

    ${p => p.theme.breakpoints.down("xs")} {
        & {
            margin-right: ${p => p.theme.spacing(1)}px;
            display: inline-block;
        }
    }
`;

const drawerOpen = css<ComponentProps<any>>`
    width: ${p => p.theme.constants.drawerWidth};
    overflow-x: hidden;
    transition: ${p =>
        ["width", "max-height"]
            .map(d =>
                p.theme.transitions.create(d, {
                    easing: p.theme.transitions.easing.sharp,
                    duration: p.theme.transitions.duration.enteringScreen,
                })
            )
            .join(", ")};

    ${p => p.theme.breakpoints.down("xs")} {
        & {
            width: 100%;
            height: auto;
            max-height: 100%;
        }
    }
`;

const drawerClose = css<ComponentProps<any>>`
    width: ${p => p.theme.constants.drawerWidthClosed};

    ${p => p.theme.breakpoints.down("xs")} {
        & {
            max-height: 0;
        }
    }
`;

const CustomDrawer = styled(Drawer)<{ open?: boolean }>`
    flex-shrink: 0;
    white-space: nowrap;
    ${drawerOpen}
    ${p => !p.open && drawerClose}

    .MuiDrawer-paper {
        ${drawerOpen}
        ${p => !p.open && drawerClose}
    }
`;

const DrawerToolbar = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: ${p => p.theme.spacing(0, 1)}px;
`;

const NoGutterContainer = styled(Container)`
    ${p => p.theme.breakpoints.down("xs")} {
        & {
            padding: 0;
        }
    }
`;

const MainContent = styled.div<{ open: boolean }>`
    flex-grow: 1;
    padding: ${p => p.theme.spacing(2)}px;
    margin-left: ${p => p.theme.constants.drawerWidthClosed};
    ${bodyClose}
    ${p => p.open && bodyOpen}

    ${p =>
        p.open &&
        css`
            ${p.theme.breakpoints.down("sm")} {
                & {
                    margin-left: ${p => p.theme.constants.drawerWidthClosed};
                    width: calc(100% - ${p => p.theme.constants.drawerWidthClosed});
                }
            }
        `}
    ${p => p.theme.breakpoints.down("xs")} {
        & {
            width: 100%;
            margin-left: 0;
            margin-bottom: ${p => p.theme.spacing(7)}px;
            padding: ${p => p.theme.spacing(1)}px;
        }
    }
`;

const ProfileAvatar = styled.div`
    margin-right: ${p => p.theme.spacing(1)}px;
`;

const App: React.FC = () => {
    const history = useHistory();
    const isMobile = useMediaQuery(MainTheme.breakpoints.down("xs"));
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [profile, setProfile] = React.useState<GoogleProfile>();
    const [isSignedIn, setIsSignedIn] = React.useState<boolean | undefined>(undefined);

    const handleSignoutClick = () => {
        GoogleApi.signOut();
        setProfile(undefined);
    };

    const [[open], setOpen] = React.useState<[boolean, boolean]>([false, false]);

    const handleDrawerToggle = () => setOpen(p => [!p[0], true]);
    const handleDrawerClickaway = () => setOpen(p => [p[1] ? p[0] : false, false]);
    const handleDrawerClose = () => setOpen([false, false]);

    React.useEffect(() => {
        GoogleApi.initClient(async (isSignedIn: boolean) => {
            let redirect = history.location.pathname;
            setIsSignedIn(isSignedIn);
            if (!isSignedIn) {
                history.push("/signin/");
                return;
            }
            if (redirect.match("/signin")) redirect = "/";
            history.push(redirect);
            setProfile(GoogleApi.getProfile());
            GoogleApi.prepareAppData(dispatch, state)();
        });
        Scry.Symbology.All()
            .then(symbols => {
                const endpoint = Axios.create({
                    baseURL: "",
                    responseType: "text",
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                });
                return Promise.all(
                    symbols.map(symbol =>
                        endpoint.get<string, AxiosResponse<ScryCardSymbol>>(symbol.svg_uri, { transformResponse: r => ({ ...symbol, svg: r }) })
                    )
                );
            })
            .then(responses => {
                dispatch({
                    type: "AddSymbols",
                    symbols: responses.map(r => r.data),
                });
            })
            .then(Scry.Sets.All)
            .then(sets => {
                const endpoint = Axios.create({
                    baseURL: "",
                    responseType: "text",
                    headers: {
                        "Content-Type": "image/svg+xml",
                    },
                });
                return Promise.all(
                    sets.map(set => endpoint.get<string, AxiosResponse<ScrySet>>(set.icon_svg_uri, { transformResponse: r => ({ ...set, icon_svg: r }) }))
                );
            })
            .then(responses => {
                dispatch({
                    type: "AddSets",
                    sets: responses.map(r => r.data),
                });
            });
        // eslint-disable-next-line
    }, []);

    return (
        <State.Provider value={[state, dispatch]}>
            <CustomAppBar position="sticky" open={open}>
                <Toolbar>
                    {!isMobile && (
                        <MenuButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" open={open}>
                            <MenuIcon />
                        </MenuButton>
                    )}
                    <Typography variant="h6" style={{ overflow: "hidden" }}>
                        <MUILink variant="inherit" color="inherit" underline="none" component={Link} to="/">
                            MTGCollection
                        </MUILink>
                    </Typography>
                    <FlexCol />
                    {isSignedIn ? (
                        <>
                            {!isNullOrUndefined(profile) && (
                                <ProfileAvatar>
                                    <Tooltip title={`Signed in as ${profile.getGivenName()} (${profile.getEmail()})`}>
                                        <Avatar component={Link} to="/user/" alt={profile.getGivenName()} src={profile.getImageUrl()} />
                                    </Tooltip>
                                </ProfileAvatar>
                            )}
                            <TooltipButton title="SignOut" onClick={handleSignoutClick}>
                                <ExitToAppIcon />
                            </TooltipButton>
                        </>
                    ) : (
                        <SignInButton onClick={GoogleApi.signIn} />
                    )}
                </Toolbar>
            </CustomAppBar>
            <ClickAwayListener onClickAway={() => isMobile && handleDrawerClickaway()}>
                <CustomDrawer open={open} anchor={isMobile ? "bottom" : "left"} variant="permanent">
                    <DrawerToolbar>
                        <IconButton onClick={handleDrawerClose}>{isMobile ? <CloseIcon /> : <ChevronLeftIcon />}</IconButton>
                    </DrawerToolbar>
                    <Divider />
                    {isSignedIn && <DrawerDeckList open={open} closeDrawer={() => isMobile && open && handleDrawerToggle()} />}
                </CustomDrawer>
            </ClickAwayListener>
            <NoGutterContainer maxWidth="xl">
                <MainContent open={open}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signin/" component={SignIn} />
                        <Route exact path="/user/" component={UserInfo} />
                        <Route exact path="/addDeck/" component={AddDeck} />
                        <Route path="/decks/:deckName" component={DeckPreview} />
                        <Route component={NotFound} />
                    </Switch>
                </MainContent>
            </NoGutterContainer>
            {isMobile && <MobileNavigation open={open} toggleOpen={handleDrawerToggle} />}
        </State.Provider>
    );
};
export default App;
