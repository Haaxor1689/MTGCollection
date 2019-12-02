import { createMuiTheme } from "@material-ui/core/styles";
import baseStyled, { css as styledCss, ThemedStyledInterface, ThemedStyledProps, ThemeProvider as ThemeProv } from "styled-components";

const additionalArgs = {
    constants: {
        drawerWidth: "240px",
        appletHeight: "240px",
    } 
};

export const MainTheme = createMuiTheme({
}, additionalArgs);

export const ThemeProvider = ThemeProv;
export const css = styledCss;

export type Theme = typeof MainTheme & typeof additionalArgs;
export type ComponentProps<T> = ThemedStyledProps<T, Theme>;
const styled = baseStyled as ThemedStyledInterface<Theme>;
export default styled;
