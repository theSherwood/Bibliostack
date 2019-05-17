import React, { useEffect, useState } from "react";
import Book from "./Book";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
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
    },
    [theme.breakpoints.down(600)]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      marginTop: 0
    }
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

const mockDB = [
  {
    title: "lord of the rings",
    author: "tolkien",
    budget: "5"
  },
  {
    title: "silmarillion",
    author: "tolkien",
    budget: "5"
  },
  {
    title: "catcher in the rye",
    budget: "4"
  }
];

const Booklist = props => {
  const { classes } = props;
  const [fetchResults, setFetchResults] = useState(0);
  const [expand, setExpand] = useState(false);
  const [booklist, setBooklist] = useState(mockDB);

  useEffect(() => {
    console.log(booklist);
  }, [booklist]);

  const updateBooklist = (book, index) => {
    const newBooklist = [...booklist];
    newBooklist[index] = book;
    setBooklist(newBooklist);
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Button
          onClick={() => {
            setExpand(true);
            setFetchResults(fetchResults + 1);
          }}
        >
          Fetch Results
        </Button>
        <Button onClick={() => setExpand(!expand)}>Toggle Collapse</Button>
        {booklist.map((book, i) => (
          <Book
            key={i}
            index={i}
            fetchResults={fetchResults}
            expand={expand}
            book={book}
            updateBooklist={updateBooklist}
          />
        ))}
      </Paper>
    </main>
  );
};

export default withStyles(styles)(Booklist);
