import { RouteProps } from "react-router";
import AddDeck from "../Components/Applets/AddDeck";
import DeckPreview from "../Components/Applets/DeckPreview";
import Home from "../Components/Applets/Home";
import Lifecounter from "../Components/Applets/Lifecounter";
import UserInfo from "../Components/Applets/UserInfo";
import SignIn from "../Components/SignIn";

type Route = Pick<RouteProps, "component"> & { path: string };

type RoutesType = {
    IsPublic: (path: string) => boolean;
    SignIn: Route;
    Public: Route[];
    Private: Route[];
};

const PathMatch = (path: string) => new RegExp(`^${path.replace(/:[^/]*/, "[^/]*")}$`);

const Public: Route[] = [{ path: "/lifecounter", component: Lifecounter }];
const Private: Route[] = [
    { path: "/user", component: UserInfo },
    { path: "/addDeck", component: AddDeck },
    { path: "/decks/:deckName", component: DeckPreview },
    { path: "/", component: Home },
];

const Routes: RoutesType = {
    IsPublic: route => Public.some(({ path }) => route.match(PathMatch(path))),
    SignIn: { path: "/signin", component: SignIn },
    Public,
    Private,
};
export default Routes;
