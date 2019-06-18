import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosConfigToken from "./helpers/axiosConfigToken";
import jwt_decode from "jwt-decode";

import Auth from "./components/auth/Auth";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NotFound from "./components/routing/NotFound";
import Bookstack from "./components/books/Bookstack";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { withStyles } from "@material-ui/core/styles";

import "./App.css";

const styles = {
  app: {
    minHeight: "100vh",
    position: "relative",
    paddingBottom: 100,
    [theme.breakpoints.down(600)]: {
      paddingBottom: 40
    }
  },
  backdrop: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0",
    background: "rgb(177,102,138)",
    background:
      "linear-gradient(130deg, rgba(177,102,138,1) 0%, rgba(241,131,137,1) 31%, rgba(255,137,137,1) 49%, rgba(254,145,138,1) 59%, rgba(246,204,144,1) 100%)"
  }
};

const initialState = {
  isAuthenticated: false,
  user: null
};

// Get auth token
const token = localStorage.getItem("jwtToken");
if (token) {
  axiosConfigToken(token);
  const decodedUser = jwt_decode(token);
  initialState.user = decodedUser;
  initialState.isAuthenticated = true;
}

function reducer(state, action) {
  switch (action.type) {
    case "signout":
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case "signin":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.id
      };
    default:
      throw new Error("must dispatch an action with a type field");
  }
}

function App(props) {
  const { classes } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={classes.backdrop} />
        <div className={"App " + classes.app}>
          <Header dispatch={dispatch} state={state} />
          <div>
            <Switch>
              <ProtectedRoute
                exact
                path="/sign/:type"
                accessType="guest"
                dispatch={dispatch}
                isAuthenticated={state.isAuthenticated}
                component={Auth}
              />
              <Route
                exact
                path="/"
                render={props => <Bookstack {...state} {...props} />}
              />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
