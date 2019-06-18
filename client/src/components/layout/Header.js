import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import axiosConfigToken from "../../helpers/axiosConfigToken";
import { withRouter } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appbar: {
    background: "transparent",
    boxShadow: "none"
  }
};

function Header(props) {
  const { classes, dispatch, state } = props;

  // Sign Out user
  const signOutUser = () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove token from axios header
    axiosConfigToken(false);
    // Set user to empty object
    dispatch({ type: "signout" });
    props.history.push("/sign/in");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <div className={classes.grow}>
            <Button color="inherit">
              <Typography color="inherit">
                <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  underline="none"
                >
                  BiblioStack
                </Link>
              </Typography>
            </Button>
          </div>
          {state.isAuthenticated ? (
            <Button color="inherit" onClick={signOutUser}>
              Sign Out
            </Button>
          ) : (
            <Fragment>
              <Button color="inherit">
                <Link
                  component={RouterLink}
                  to={
                    "/sign/" +
                    (props.history.location.pathname.slice(-2) === "in"
                      ? "up"
                      : "in")
                  }
                  color="inherit"
                  underline="none"
                >
                  {props.history.location.pathname.slice(-2) === "in"
                    ? "Sign Up"
                    : "Sign In"}
                </Link>
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Header));
