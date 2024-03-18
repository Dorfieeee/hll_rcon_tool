import { createMuiTheme } from "@material-ui/core";

const RedTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#fff",
        },
        secondary: {
            light: "#708690",
            main: "#445963",
            dark: "#1b3039",
            contrastText: "#000",
        },
    },
});

export default RedTheme;