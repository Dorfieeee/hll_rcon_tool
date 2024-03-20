import { createTheme } from "@mui/material";

const CamoDarkTheme = createTheme({
    palette: {
        primary: {
            light: "#629749",
            main: "#33691e",
            dark: "#003d00",
            contrastText: "#000",
        },
        secondary: {
            light: "#ffffb3",
            main: "#ffe082",
            dark: "#caae53",
            contrastText: "#000",
        },
        background: {
            default: "#343434",
            paper: "#424242",
        },
        text: {
            primary: "#fff",
            secondary: " rgba(255, 255, 255, 0.7)",
            disabled: "rgba(255, 255, 255, 0.5)",
        },
    },
});

export default CamoDarkTheme;