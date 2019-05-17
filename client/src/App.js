import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import axiosConfigToken from "./helpers/axiosConfigToken";
import jwt_decode from "jwt-decode";
import { setUser } from "./actions/authActions";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Auth from "./components/auth/Auth";
import HandleJWT from "./components/auth/HandleJWT";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
// import PrivateRoute from "./components/routing/PrivateRoute";
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
  user: null,
  booklist: null
};

// Get auth token
const token = localStorage.getItem("jwtToken");
if (token) {
  axiosConfigToken(token);
  const decodedUser = jwt_decode(token);
  initialState.user = decodedUser;
}

function reducer(state, action) {
  switch (action.type) {
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        booklist: null
      };
    case "login":
      console.log("dispatch successful");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.id,
        booklist: action.payload.booklist
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
          <Header />
          <div>
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route
                exact
                path="/auth"
                render={() => <Auth dispatch={dispatch} />}
              />
              <Route
                exact
                path="/booklist"
                render={() => <Booklist {...state} />}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/jwt/:token" component={HandleJWT} />
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
