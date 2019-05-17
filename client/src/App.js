import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosConfigToken from "./helpers/axiosConfigToken";
import jwt_decode from "jwt-decode";

import Auth from "./components/auth/Auth";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import HandleJWT from "./components/auth/HandleJWT";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NotFound from "./components/routing/NotFound";
import Booklist from "./components/books/Booklist";

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
  }
}

function App(props) {
  const { classes } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(typeof dispatch);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className={"App " + classes.app}>
          <Header dispatch={dispatch} />
          <div>
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <ProtectedRoute
                exact
                path="/sign/:type"
                accessType="guest"
                dispatch={dispatch}
                isAuthenticated={state.isAuthenticated}
                component={Auth}
              />
              } />
              <Route
                exact
                path="/jwt/:token"
                render={() => <HandleJWT dispatch={dispatch} />}
              />
              <Route
                exact
                path="/booklist"
                render={props => <Booklist {...state} {...props} />}
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
