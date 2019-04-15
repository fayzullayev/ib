import {createMuiTheme} from "@material-ui/core";

const primary = '#00AEED';
const secondary = '#00AEED';
const bar  = '#0A266C';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        }
    },
    submit: {
        borderRadius: "23px",
        boxShadow: "4px 5px 9px rgba(255, 192, 4, 0.19);",
        margin: "auto",
        fontSize: "14px",
        padding: "10px 60px",
        marginBottom: 16,
        color : 'white'
    },
    sideBarDrawerBack:bar,
    typography: {useNextVariants: true}
});

export default theme;