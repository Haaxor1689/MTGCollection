import { CssBaseline } from "@material-ui/core";
import { ThemeProvider as MUIThemeProvider, StylesProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { MainTheme } from "./Components/Styled/Theme";

ReactDOM.render(
    <StylesProvider injectFirst>
        <ThemeProvider theme={MainTheme}>
            <MUIThemeProvider theme={MainTheme}>
                <CssBaseline />
                <App />
            </MUIThemeProvider>
        </ThemeProvider>
    </StylesProvider>,
    document.getElementById("root")
);

serviceWorker.register();
