import { createMuiTheme } from "@material-ui/core";

const CamoLight = createMuiTheme({
    palette: {
        primary: {
            light: "#629749",
            main: "#33691e",
            dark: "#003d00",
            contrastText: "#000",
        },
        secondary: {
            light: "#6a4f4b",
            main: "#3e2723",
            dark: "#1b0000",
            contrastText: "#000",
        },
        background: {
            default: "#ffffe5",
            paper: "#fff8e1",
        },
        text: {
            primary: "#000",
            secondary: " rgba(0, 0, 0, 0.7)",
            disabled: "rgba(0, 0, 0, 0.5)",
        },
    },
});

export default CamoLight;