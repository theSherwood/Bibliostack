import React, { useEffect, useRef, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import styles from "./BookStyles.js";

const $symbols = {
  USD: "$",
  GBP: "£"
};

const initialState = {
  fetching: false,
  ebayBookResult: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { ...state, fetching: true, ebayBookResult: null, error: null };
    case "setEbayBookResult":
      return { ...state, fetching: false, ebayBookResult: action.payload };
    case "clearResult":
      return { ...state, ebayBookResult: null };
    case "setError":
      return { ...state, fetching: false, error: action.payload };
    case "clearError":
      return { ...state, error: null };
    default:
      return state;
  }
}

const Book = props => {
  const {
    fetchResults,
    classes,
    expand,
    book,
    updateBookstack,
    deleteBook,
    index,
    labels,
    countryCode
  } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ebayBookResult, fetching, error } = state;
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [budget, setBudget] = useState(book.budget || "");
  const [results, setResults] = useState(book.results || "");

  useEffect(() => {
    setExpanded(expand);
  }, [expand]);

  useEffect(() => {
    if (fetchResults) {
      fetchBooks();
    }
  }, [fetchResults]);

  const fetchBooks = () => {
    dispatch({ type: "fetching" });
    const body = {
      title,
      author,
      budget,
      results,
      country: countryCode
    };
    axios
      .post("/api/books/book", body)
      .then(res => {
        const books = res.data;
        dispatch({ type: "setEbayBookResult", payload: books || [] });
      })
      .catch(err => dispatch({ type: "setError", payload: err }));
  };

  const handlePanelClick = e => {
    if (
      !(
        e.target.matches("input") ||
        e.target.matches(".deleteButton, .deleteButton *")
      )
    ) {
      setExpanded(!expanded);
    }
  };

  let resultsContent;
  if (ebayBookResult) {
    resultsContent =
      ebayBookResult.length > 0 ? (
        <Grid container wrap="nowrap" spacing={0}>
          <ul className={classes.ul}>
            {ebayBookResult.map(book => {
              const currentPrice = book.sellingStatus[0].currentPrice[0];
              const currency =
                $symbols[currentPrice["@currencyId"]] ||
                currentPrice["@currencyId"];
              const value = currentPrice["__value__"];
              const url = book.viewItemURL[0];
              return (
                <li key={book.itemId[0]} className={classes.li}>
                  <Grid container wrap="nowrap" spacing={0}>
                    <Grid item xs zeroMinWidth>
                      {currency} {value + " : "}
                      <Typography noWrap={true}>
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {book.title[0]}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            })}
          </ul>
        </Grid>
      ) : (
        <p>No results found</p>
      );
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded} square>
        <ExpansionPanelSummary
          className={classes.summary}
          onClick={handlePanelClick}
        >
          <div className={classes.grow}>
            <Grid container spacing={16} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={classes.textField}
                  label={labels ? "title" : null}
                  autoFocus
                  onBlur={() =>
                    updateBookstack(
                      { title, author, budget, results, _id: book._id },
                      index
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className={classes.textField}
                  label={labels ? "author" : null}
                  onBlur={() =>
                    updateBookstack(
                      { title, author, budget, results, _id: book._id },
                      index
                    )
                  }
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className={classes.textField}
                  label={labels ? "budget" : null}
                  onBlur={() =>
                    updateBookstack(
                      { title, author, budget, results, _id: book._id },
                      index
                    )
                  }
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField
                  value={results}
                  onChange={e => setResults(e.target.value)}
                  className={classes.textField}
                  label={labels ? "results" : null}
                  onBlur={() =>
                    updateBookstack(
                      { title, author, budget, results, _id: book._id },
                      index
                    )
                  }
                />
              </Grid>
            </Grid>
            <Grid container className={classes.buttonContainer}>
              <div className={classes.placeCenter}>
                <IconButton
                  className="deleteButton"
                  onClick={() => deleteBook(book._id)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div className={classes.placeCenter}>
                <IconButton>
                  <ExpandMoreIcon className={expanded ? classes.less : null} />
                </IconButton>
              </div>
            </Grid>
          </div>
        </ExpansionPanelSummary>
        {fetching || error || resultsContent ? (
          <ExpansionPanelDetails className={classes.details}>
            {fetching ? <p>Fetching results...</p> : null}
            {error ? error.message : resultsContent}
          </ExpansionPanelDetails>
        ) : null}
        <ExpansionPanelActions className={classes.actions}>
          <Button size="small" onClick={() => fetchBooks()}>
            Fetch Results
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(Book);
