import React, { lazy } from "react";
import Loading from "../Components/Loading";

const LazyRoute = (component: Parameters<typeof lazy>[0]) => {
    const Component = lazy(component);
    // eslint-disable-next-line react/display-name
    return () => (
        <React.Suspense fallback={<Loading />}>
            <Component />
        </React.Suspense>
    );
};
export default LazyRoute;
