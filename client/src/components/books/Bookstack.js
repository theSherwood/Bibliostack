import React, { useEffect, useState, Fragment } from "react";
import Book from "./Book";
import Button from "@material-ui/core/Button";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withStyles, Typography, Link } from "@material-ui/core";
import CountryPicker from "../country/CountryPicker";
import styles from "./BookstackStyles";
import axios from "axios";
import uuid from "../../helpers/quickUUID";
import { Link as RouterLink } from "react-router-dom";

const getCountryCode = () => {
  return localStorage.getItem("countryCode") || "EBAY-US";
};

const Bookstack = props => {
  const { classes, isAuthenticated } = props;
  const [fetchResults, setFetchResults] = useState(0);
  const [expand, setExpand] = useState(false);
  const [bookstack, setBookstack] = useState([]);
  const [countryCode, setCountryCode] = useState(getCountryCode());

  useEffect(() => {
    getBookstack();
  }, []);

  const updateCountryCode = code => {
    localStorage.setItem("countryCode", code);
    setCountryCode(code);
  };

  const getBookstack = () => {
    isAuthenticated ? getBookstackServer() : getBookstackLocal();
  };
  const getBookstackServer = () => {
    axios
      .get("api/books/bookstack")
      .then(res => {
        setBookstack([{ _id: uuid() }, ...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getBookstackLocal = () => {
    const bookstackStr = localStorage.getItem("bookstack");
    if (bookstackStr) {
      setBookstack([{ _id: uuid() }, ...JSON.parse(bookstackStr)]);
    } else {
      setBookstack([{ _id: uuid() }]);
    }
  };

  const updateBookstack = (book, index) => {
    const newBookstack = [...bookstack];
    newBookstack[index] = book;
    setBookstack(newBookstack);
  };

  const deleteBook = id => {
    const newBookstack = bookstack.filter(book => book._id !== id);
    setBookstack(newBookstack);
  };

  const storeBookstack = bookstack => {
    let filteredBookstack;
    if (bookstack) {
      filteredBookstack = bookstack.filter(book => {
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
      filteredBookstack = [];
    }
    setBookstack(filteredBookstack);

    isAuthenticated
      ? storeBookstackServer(filteredBookstack)
      : storeBookstackLocal(filteredBookstack);
  };

  const storeBookstackServer = bookstack => {
    // remove the _ids before it goes to the database
    const mappedBookstack = bookstack.map(book => ({
      title: book.title,
      author: book.author,
      budget: book.budget,
      results: book.results
    }));
    axios
      .post("api/books/bookstack", { bookstack: mappedBookstack })
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  };

  const storeBookstackLocal = bookstack => {
    localStorage.setItem("bookstack", JSON.stringify(bookstack));
  };

  const handleAddBook = () => {
    if (bookstack) {
      setBookstack([{ _id: uuid() }, ...bookstack]);
    } else {
      setBookstack([{ _id: uuid() }]);
    }
  };

  const fetchAll = () => {
    setExpand(true);
    setFetchResults(fetchResults + 1);
    storeBookstack(bookstack);
  };

  return (
    <main
      className={classes.main}
      onKeyPress={e => {
        e.key === "Enter" && handleAddBook();
      }}
    >
      <CountryPicker
        countryCode={countryCode}
        updateCountryCode={updateCountryCode}
      />
      <div className={classes.paper}>
        {isAuthenticated ? null : (
          <p style={{ textAlign: "center", color: "white" }}>
            You are not signed in. Your books cannot be saved to your account.
          </p>
        )}
        {bookstack ? (
          <Fragment>
            <Button onClick={fetchAll}>
              <Typography variant="h6">Fetch Results</Typography>
            </Button>
            <Button onClick={() => setExpand(!expand)}>
              <Typography variant="h6">Collapse All</Typography>
            </Button>
          </Fragment>
        ) : null}
        <Button onClick={handleAddBook}>
          <Typography variant="h6">Add Book</Typography>
        </Button>
        {bookstack ? (
          <TransitionGroup className="bookstack-transition-group">
            {bookstack.map((book, i) => (
              <CSSTransition classNames="book" timeout={200} key={book._id}>
                <Book
                  className={classes.book}
                  index={i}
                  labels={i === 0}
                  fetchResults={fetchResults}
                  expand={expand}
                  book={book}
                  updateBookstack={updateBookstack}
                  deleteBook={deleteBook}
                  countryCode={countryCode}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : null}
      </div>
    </main>
  );
};

export default withStyles(styles)(Bookstack);
