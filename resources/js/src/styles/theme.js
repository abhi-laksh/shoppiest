import { createMuiTheme } from '@material-ui/core/styles';

/* 
    @objects
    > overrides: Changes default style injected by Material-UI into the DOM

    > ascents: Specially for dynamic input , buttons for optimization.

    > palette: Color scheme in whole app. Reference from EO2V2_Specifications

    > typography: Styles for all texts in h1,button etc.
*/

const theme = createMuiTheme({

    overrides: {
        MuiInputLabel: {
            root: {
                fontSize: 12
            }
        },
        MuiInput: {
            root: {
                fontSize: 14
            }
        },
        MuiFormControl: {
            root: {
                marginTop: 14
            }
        },
    },

    palette: {

        primary: {
            light: "#7e83d4",
            main: "#5F68D9",
            dark: "#303ac2",
            wash: "#EBECFF",
            contrastText: "#fff",
        },
        secondary: {
            light: "#62d3ff",
            main: "#00A2E0",
            dark: "#0074ae",
            contrastText: "#000",
        },
        success: {
            light: "#9df971",
            main: "#69C540",
            dark: "#329402",
        },
        text: {
            primary: "#4A4A4A",
            secondary: "#2B6BCB",
            disabled: "#ddd",
            systemWhite: "#fff",
            systemWash: "#ECECEC",
            hint: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            default: "#ECECEC"
        },

        ascents: {
            orange: "#ffa357",
            green: "#78db4d",
            honey: "#FFC937",
            primary: "#5F68D9",
            secondary: "#00A2E0",
            systemWhite: "#fff",
            systemWash: "#ECECEC",
            systemMetalLight: "#3A3A3A",
            systemMetalDark: "#2F2F2F",
            systemSkyLight: "#EDF5FF",
            systemSkyDark: "#c9deff",
        },

        contrast: {
            orange: "#d35f00",
            green: "#47d400",
            honey: "#ffae00",
            primary: "#303ac2",
            secondary: "#0074ae",
            systemWhite: "#eee",
            systemWash: "#ccc",
            systemMetalLight: "#222222",
            systemMetalDark: "#111",
            systemSkyLight: "#a6c9f5",
            systemSkyDark: "#73a9ff",
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',

        h1: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 40
        },
        h2: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 25,
        },
        h3: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 20,
        },
        h4: {

            fontFamily: '"Roboto", sans-serif',
            fontSize: 18,
        },
        h5: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 18,
        },
        h6: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 18,
        },
        body1: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 14,
        },
        body2: {
            fontFamily: '"Roboto", sans-serif',
            fontSize: 12,
        },
        button: {
            fontFamily: '"Roboto", sans-serif',
            textTransform: "capitalize",
            fontSize: 14,
        },
    },

});

export default theme;