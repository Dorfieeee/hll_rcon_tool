import { createMuiTheme } from "@material-ui/core";

const GreenYellowDarkTheme = createMuiTheme({
    editor: "vs-dark",
    palette: {
        primary: {
            light: "#5edfca",
            main: "#17ad99",
            dark: "#007d6b",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ffe54c",
            main: "#ffb300",
            dark: "#c68400",
            contrastText: "#000",
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

export default GreenYellowDarkTheme;