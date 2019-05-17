import React, { useEffect, useState } from "react";
import Book from "./Book";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import styles from "./BooklistStyles";

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
