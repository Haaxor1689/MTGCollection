import { RouteProps } from "react-router";
import LazyRoute from "./LazyRoute";

export const RouteNames = {
    // Public
    SignIn: "/signin",
    Lifecounter: "/lifecounter",
    // Private
    User: "/user",
    AddDeck: "/addDeck",
    Deck: (name: string) => `/decks/${name}`,
    Home: "/",
};

type Route = Pick<RouteProps, "component"> & { path: string };

type RoutesType = {
    IsPublic: (path: string) => boolean;
    Public: Route[];
    Private: Route[];
};

const PathMatch = (path: string) => new RegExp(`^${path.replace(/:[^/]*/, "[^/]*")}$`);

const Public: Route[] = [
    { path: RouteNames.SignIn, component: LazyRoute(() => import("../Components/Applets/SignIn")) },
    { path: RouteNames.Lifecounter, component: LazyRoute(() => import("../Components/Applets/Lifecounter")) },
];
const Private: Route[] = [
    { path: RouteNames.User, component: LazyRoute(() => import("../Components/Applets/UserInfo")) },
    { path: RouteNames.AddDeck, component: LazyRoute(() => import("../Components/Applets/AddDeck")) },
    { path: RouteNames.Deck(":deckName"), component: LazyRoute(() => import("../Components/Applets/DeckPreview")) },
    { path: RouteNames.Home, component: LazyRoute(() => import("../Components/Applets/Home")) },
];

const Routes: RoutesType = {
    IsPublic: route => Public.some(({ path }) => route.match(PathMatch(path))),
    Public,
    Private,
};
export default Routes;
