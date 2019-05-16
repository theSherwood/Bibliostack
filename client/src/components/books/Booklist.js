import React, { useEffect } from "react";
import { getBooks } from "../../actions/bookActions";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Book from "./Book";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const Booklist = props => {
  const { classes, getBooks } = props;

  // useEffect(() => {
  //   getBooks();
  // }, []);

  const mockArray = [];
  for (let i = 0; i < 5; i++) {
    mockArray.push(i);
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        {mockArray.map((val, i) => (
          <Book key={i} />
        ))}
      </Paper>
    </main>
  );
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { getBooks }
  )
)(Booklist);
