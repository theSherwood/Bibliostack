import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./AuthStyles";
import { signInUser, signUpUser } from "./AuthActions";

function Auth(props) {
  const isSignIn = props.match.params.type === "in";
  const { classes, dispatch, history, isAuthenticated } = props;
  console.log("auth", isAuthenticated);
  if (isAuthenticated) {
    history.push("/");
  }
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    setErrors({
      email: null,
      password: null,
      confirmPassword: null
    });
    return () => {
      setErrors({
        email: null,
        password: null,
        confirmPassword: null
      });
    };
  }, [isSignIn]);

  const handleSubmit = async e => {
    e.preventDefault();
    let err;
    if (isSignIn) {
      err = await signInUser(formData, history, dispatch);
    } else {
      err = await signUpUser(formData, history, dispatch);
    }
    if (err) {
      setErrors(err.response.data);
    }
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
              autoComplete={isSignIn ? "on" : "off"}
              autoFocus
              value={email}
              onChange={handleInput}
              error={!!errors.email}
            />
            {errors.email ? (
              <Typography color="error">{errors.email}</Typography>
            ) : null}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete={isSignIn ? "on" : "off"}
              value={password}
              onChange={handleInput}
              error={!!errors.password}
            />
            {errors.password ? (
              <Typography color="error">{errors.password}</Typography>
            ) : null}
          </FormControl>
          {isSignIn ? null : (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete={isSignIn ? "on" : "off"}
                value={confirmPassword}
                onChange={handleInput}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword ? (
                <Typography color="error">{errors.confirmPassword}</Typography>
              ) : null}
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
