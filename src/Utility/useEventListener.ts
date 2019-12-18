import React from "react";

const useEventListener = <K extends keyof WindowEventMap>(eventName: K, handler: (this: Window, ev: WindowEventMap[K]) => any, element = window) => {
    const savedHandler = React.useRef<any>();
    
    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(
        () => {
            if (!element || !element.addEventListener) return;
            const eventListener = (event: WindowEventMap[K]) => savedHandler.current(event);
            element.addEventListener(eventName, eventListener);
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element]
    );
};
export default useEventListener;
