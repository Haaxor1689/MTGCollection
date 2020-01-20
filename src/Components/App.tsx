import { AppBar, Avatar, Container, Divider, Drawer, IconButton, Link as MUILink, Toolbar, Tooltip, Typography, useMediaQuery } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import Axios, { AxiosResponse } from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isNullOrUndefined } from "util";
import AppRouter from "../Routes/AppRouter";
import Routes from "../Routes/Routes";
import { AppState, initialState, LoginState } from "../State";
import { reducer } from "../State/Reducers";
import GoogleApi, { GoogleProfile } from "../Utility/GoogleApi";
import Scry from "../Utility/Scry";
import { ScryCardSymbol, ScrySet } from "../Utility/Scry/Types";
import useClickaway from "../Utility/useClickaway";
import DrawerApps from "./Drawer/DrawerApps";
import DrawerDeckList from "./Drawer/DrawerDeckList";
import MobileNavigation from "./Drawer/MobileNavigation";
import Loading from "./Loading";
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
            max-height: calc(100% - 56px);
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
        overflow: hidden;
    }
`;

const DrawerToolbar = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
`;

const DrawerBody = styled.div<{ open?: boolean }>`
    overflow: hidden;
    padding-bottom: ${p => p.theme.spacing(6)}px;
    ${p =>
        p.open &&
        css`
            overflow-y: auto;
        `}

    &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";
        pointer-events: none;
        background: linear-gradient(
            0deg,
            ${p => p.theme.palette.background.paper} ${p => p.theme.spacing(1)}px,
            transparent ${p => p.theme.spacing(8)}px,
            transparent 100%
        );
    }
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
    const isSmall = useMediaQuery(MainTheme.breakpoints.down("sm"));
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const [profile, setProfile] = React.useState<GoogleProfile>();
    const [isSignedIn, setIsSignedIn] = React.useState<boolean | undefined>(undefined);

    const handleSignoutClick = () => {
        GoogleApi.signOut();
        setProfile(undefined);
    };

    const [open, setOpen] = React.useState(false);
    const handleDrawerToggle = () => setOpen(p => !p);
    const [drawerRef] = useClickaway<HTMLDivElement>(() => isSmall && setOpen(false));

    React.useEffect(() => {
        GoogleApi.initClient(async (signedIn: boolean) => {
            let redirect = history.location.pathname;
            if (!signedIn) {
                setIsSignedIn(false);
                if (!Routes.IsPublic(redirect)) history.push(Routes.SignIn.path);
                return;
            }
            if (redirect.match(Routes.SignIn.path)) redirect = "/";
            history.push(redirect);

            await GoogleApi.prepareAppData(dispatch, state)();

            setProfile(GoogleApi.getProfile());
            setIsSignedIn(true);
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
        <AppState.Provider value={[state, dispatch]}>
            <LoginState.Provider value={{ profile, signOut: handleSignoutClick }}>
                <CustomAppBar position="sticky" open={open}>
                    <Toolbar>
                        {!isMobile && (
                            <MenuButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" open={open}>
                                <MenuIcon />
                            </MenuButton>
                        )}
                        <Typography variant="h6" style={{ overflow: "hidden" }}>
                            <MUILink variant="inherit" color="inherit" underline="none" component={Link} to={isSignedIn ? "/" : Routes.SignIn.path}>
                                MTGCollection
                            </MUILink>
                        </Typography>
                        <FlexCol />
                        {isSignedIn ? (
                            <>
                                {!isNullOrUndefined(profile) && (
                                    <ProfileAvatar>
                                        <Tooltip title={`Signed in as ${profile.getGivenName()} (${profile.getEmail()})`}>
                                            <Avatar component={Link} to="/user" alt={profile.getGivenName()} src={profile.getImageUrl()} />
                                        </Tooltip>
                                    </ProfileAvatar>
                                )}
                                <TooltipButton title="SignOut" onClick={handleSignoutClick}>
                                    <ExitToAppIcon />
                                </TooltipButton>
                            </>
                        ) : (
                            isSignedIn !== undefined && <SignInButton onClick={GoogleApi.signIn} />
                        )}
                    </Toolbar>
                </CustomAppBar>
                <CustomDrawer open={open} anchor={isMobile ? "bottom" : "left"} variant="permanent" ref={drawerRef}>
                    <DrawerToolbar>
                        <IconButton onClick={handleDrawerToggle}>{isMobile ? <CloseIcon /> : <ChevronLeftIcon />}</IconButton>
                    </DrawerToolbar>
                    <Divider />
                    <DrawerBody open={open}>
                        <DrawerApps closeDrawer={() => isMobile && setOpen(false)} />
                        {isSignedIn && <DrawerDeckList open={open} closeDrawer={() => isMobile && setOpen(false)} />}
                    </DrawerBody>
                </CustomDrawer>
                <NoGutterContainer maxWidth="xl">
                    <MainContent open={open}>{isSignedIn === undefined ? <Loading /> : <AppRouter />}</MainContent>
                </NoGutterContainer>
                {isMobile && <MobileNavigation open={open} toggleOpen={handleDrawerToggle} />}
            </LoginState.Provider>
        </AppState.Provider>
    );
};
export default App;
