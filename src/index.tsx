import { CssBaseline } from "@material-ui/core";
import { ThemeProvider as MUIThemeProvider, StylesProvider } from "@material-ui/core/styles";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./Components/App";
import { MainTheme } from "./Components/Styled/Theme";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <StylesProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                <MUIThemeProvider theme={MainTheme}>
                    <CssBaseline />
                    <App />
                </MUIThemeProvider>
            </ThemeProvider>
        </StylesProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.register();
