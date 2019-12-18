import { createMuiTheme } from "@material-ui/core/styles";
import baseStyled, { css as styledCss, ThemedStyledInterface, ThemedStyledProps, ThemeProvider as ThemeProv } from "styled-components";
import { colors } from "@material-ui/core";

const additionalArgs = {
    constants: {
        drawerWidth: "260px",
        drawerWidthClosed: "72px",
        appletHeight: "280px",
    },
};

export const MainTheme = createMuiTheme(
    {
        palette: {
            type: "dark",
            primary: { main: colors.deepOrange[700] },
            secondary: { main: colors.blueGrey[500] },
        },
    },
    additionalArgs
);

export const ThemeProvider = ThemeProv;
export const css = styledCss;

export type Theme = typeof MainTheme & typeof additionalArgs;
export type ComponentProps<T = {}> = ThemedStyledProps<T, Theme>;
const styled = baseStyled as ThemedStyledInterface<Theme>;
export default styled;
