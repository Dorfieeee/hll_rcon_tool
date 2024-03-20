import { createTheme } from "@mui/material";

const PurplePinkTheme = createTheme({
    palette: {
        primary: {
            light: "#d05ce3",
            main: "#9c27b0",
            dark: "#6a0080",
            contrastText: "#000",
        },
        secondary: {
            light: "#ffeeff",
            main: "#f8bbd0",
            dark: "#c48b9f",
            contrastText: "#fff",
        },
    },
});

export default PurplePinkTheme;