import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./AuthStyles";
import { handleJWT, signInUser, signOutUser, signUpUser } from "./AuthActions";

function Auth(props) {
  console.log(props);
  const { classes, dispatch, history } = props;
  const [isSignIn, setSignIn] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "login", payload: "psych!" });
  };

  const handleInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password, confirmPassword } = formData;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? "Sign In" : "Sign Up"}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="false"
              autoFocus
              value={email}
              onChange={handleInput}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="false"
              value={password}
              onChange={handleInput}
            />
          </FormControl>
          {isSignIn ? null : (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="false"
                value={confirmPassword}
                onChange={handleInput}
              />
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Paper>
    </main>
  );
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Auth));
