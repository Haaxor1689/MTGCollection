import React from "react";

const useDimensions = <T extends HTMLElement>() => {
    const ref = React.useRef<T>(null);
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
        setWidth(ref.current?.clientWidth ?? 0);
        setHeight(ref.current?.clientHeight ?? 0);
    }, []);
    
    return [ref, width, height] as const;
};
export default useDimensions;
