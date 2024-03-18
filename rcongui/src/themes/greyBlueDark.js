import { createMuiTheme } from "@material-ui/core";

const GreyBlueDarkTheme = createMuiTheme({
    editor: "vs-dark",
    palette: {
        primary: {
            light: "#8eacbb",
            main: "#607d8b",
            dark: "#34515e",
            contrastText: "#fff",
        },
        secondary: {
            light: "#c3fdff",
            main: "#90caf9",
            dark: "#5d99c6",
            contrastText: "#fff",
        },
        background: {
            default: "#303030",
            paper: "#424242",
        },
        text: {
            primary: "#fff",
            secondary: " rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
        },
    },
});

export default GreyBlueDarkTheme;