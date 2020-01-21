/// <reference types="react-scripts" />

declare module "nosleep.js" {
    class NoSleep {
        enable: () => void;
        disable: () => void;
    }
    export default NoSleep;
}
