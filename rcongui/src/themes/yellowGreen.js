import { createTheme } from "@mui/material";

const YellowGreenTheme = createTheme({
    palette: {
        secondary: {
            light: "#5edfca",
            main: "#17ad99",
            dark: "#007d6b",
            contrastText: "#fff",
        },
        primary: {
            light: "#ffe54c",
            main: "#ffb300",
            dark: "#c68400",
            contrastText: "#000",
        },
    },
});

export default YellowGreenTheme;