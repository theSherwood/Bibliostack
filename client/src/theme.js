import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff", //"#e65100"
      contrastText: "#ffffff",
      text: "#ffffff",
      light: "#ffffff",
      dark: "#ffffff"
    },
    secondary: {
      main: "#ffffff", // "#b2668a"
      contrastText: "#ffffff",
      text: "#ffffff",
      light: "#ffffff",
      dark: "#ffffff"
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
      disabled: "#ffffff",
      hint: "#ffffff"
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: "white"
      }
    },
    MuiExpansionPanelSummary: {
      focused: {
        background: "transparent"
      }
    }
  }
});

export default theme;
