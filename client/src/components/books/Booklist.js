import React, { useEffect, useState, Fragment } from "react";
import Book from "./Book";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles } from "@material-ui/core";
import styles from "./BooklistStyles";
import axios from "axios";
import uuid from "../../helpers/quickUUID";
import "./Booklist.css";

const Booklist = props => {
  const { classes } = props;
  const [fetchResults, setFetchResults] = useState(0);
  const [expand, setExpand] = useState(false);
  const [booklist, setBooklist] = useState([]);

  useEffect(() => {
    axios
      .get("api/books/booklist")
      .then(res => {
        setBooklist(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const updateBooklist = (book, index) => {
    const newBooklist = [...booklist];
    newBooklist[index] = book;
    setBooklist(newBooklist);
  };

  const deleteBook = id => {
    const newBooklist = booklist.filter(book => book._id !== id);
    setBooklist(newBooklist);
  };

  const postBooklist = booklist => {
    let filteredBooklist;
    if (booklist) {
      filteredBooklist = booklist.filter(book => {
        if (Object.keys(book).length) {
          return (
            (book.title && book.title.trim()) ||
            (book.author && book.author.trim()) ||
            (book.budget && book.budget.trim())
          );
        }
        return false;
      });
    } else {
      filteredBooklist = [];
    }
    setBooklist(filteredBooklist);
    // remove the _ids before it goes to the database
    const mappedBooklist = filteredBooklist.map(book => ({
      title: book.title,
      author: book.author,
      budget: book.budget
    }));
    axios
      .post("api/books/booklist", { booklist: mappedBooklist })
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  };

  const handleAddBook = () => {
    if (booklist) {
      setBooklist([{ _id: uuid() }, ...booklist]);
    } else {
      setBooklist([{ _id: uuid() }]);
    }
  };

  const fetchAll = () => {
    setExpand(true);
    setFetchResults(fetchResults + 1);
    postBooklist(booklist);
  };

  return (
    <main
      className={classes.main}
      onKeyPress={e => {
        e.key === "Enter" && handleAddBook();
      }}
    >
      <Paper className={classes.paper}>
        {booklist ? (
          <Fragment>
            <Button onClick={fetchAll}>Fetch Results</Button>
            <Button onClick={() => setExpand(!expand)}>Toggle Collapse</Button>
          </Fragment>
        ) : null}
        <Button onClick={handleAddBook}>Add Book</Button>
        {booklist ? (
          <TransitionGroup className="booklist-transition-group">
            {booklist.map((book, i) => (
              <CSSTransition classNames="book" timeout={200} key={book._id}>
                <Book
                  className={classes.book}
                  index={i}
                  fetchResults={fetchResults}
                  expand={expand}
                  book={book}
                  updateBooklist={updateBooklist}
                  deleteBook={deleteBook}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : null}
      </Paper>
    </main>
  );
};

export default withStyles(styles)(Booklist);
