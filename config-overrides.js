/* eslint-disable no-undef */
const { rewireWorkboxInject, defaultInjectConfig } = require("react-app-rewire-workbox");
const path = require("path");

module.exports = function override(config, env) {
    console.log("Adding Workbox for PWAs");
    // Extend the default injection config with required swSrc
    const workboxConfig = {
        ...defaultInjectConfig,
        maximumFileSizeToCacheInBytes: 500000000,
        swSrc: path.join(__dirname, "src", "sw.js"),
    };
    config = rewireWorkboxInject(workboxConfig)(config, env);

    return config;
};
