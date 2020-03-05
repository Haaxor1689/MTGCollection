import React from "react";
import { Route, Switch } from "react-router";
import NotFound from "../Components/NotFound";
import Routes from "./Routes";

const AppRouter: React.FC = () => (
    <Switch>
        {Routes.Public.map(r => (
            <Route key={r.path} exact {...r} />
        ))}
        {Routes.Private.map(r => (
            <Route key={r.path} exact {...r} />
        ))}
        <Route exact component={NotFound} />
    </Switch>
);
export default AppRouter;
