import React from "react";

const useClickaway = <T extends HTMLElement>(onClickaway: () => void) => {
    const elemRef = React.createRef<T>();

    const handleClickaway = (event: Event) => {
        if (elemRef.current && !elemRef?.current.contains(event.target as Node)) {
            onClickaway();
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickaway);
        document.addEventListener("touchend", handleClickaway);
        return () => {
            document.removeEventListener("click", handleClickaway);
            document.removeEventListener("touchend", handleClickaway);
        };
    });

    return [elemRef];
};
export default useClickaway;
