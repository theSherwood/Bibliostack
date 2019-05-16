import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e65100"
    },
    secondary: deepPurple
  },
  shape: {
    borderRadius: 0
  }
});

export default theme;
