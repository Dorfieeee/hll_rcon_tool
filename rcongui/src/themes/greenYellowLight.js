import { createMuiTheme } from "@material-ui/core";

const GreenYellowLightTheme = createMuiTheme({
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
    },
});

export default GreenYellowLightTheme;