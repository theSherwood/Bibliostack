import React, { useEffect, useRef, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const initialState = {
  fetching: false,
  ebayBookResult: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { ...state, fetching: true, ebayBookResult: null };
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

const styles = theme => ({
  root: {
    width: "100%"
  },
  summary: {
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 4
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center",
    paddingBottom: "10px"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  gridItem: {
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit,
      paddingTop: 2,
      paddingBottom: 2
    }
  },
  grow: {
    flexGrow: 1
  },
  textField: {
    width: "100%"
  }
});

const Book = props => {
  const { fetchResults, classes, expand, book } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { ebayBookResult, fetching, error } = state;
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [budget, setBudget] = useState(book.budget || "");

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
      budget
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
    if (!e.target.matches("input")) {
      setExpanded(!expanded);
    }
  };

  let resultsContent;
  if (ebayBookResult) {
    resultsContent =
      ebayBookResult.length > 0 ? (
        <ul>
          {ebayBookResult.map(book => {
            const currentPrice = book.sellingStatus[0].currentPrice[0];
            const currency = currentPrice["@currencyId"];
            const value = currentPrice["__value__"];
            return (
              <li key={book.itemId[0]}>
                {currency} {value + " : "}
                <Typography noWrap={true}>{book.title[0]}</Typography>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No results found</p>
      );
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary
          className={classes.summary}
          onClick={handlePanelClick}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={classes.grow}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          </div>
        </ExpansionPanelSummary>
        {fetching || error || resultsContent ? (
          <ExpansionPanelDetails className={classes.details}>
            {fetching ? <p>Fetching results...</p> : null}
            {error ? error.message : null}
            {resultsContent}
          </ExpansionPanelDetails>
        ) : null}
        {/* <Divider /> */}
        <ExpansionPanelActions>
          <Button size="small" onClick={() => fetchBooks()}>
            Fetch Results
          </Button>
          {/* <Button size="small" color="primary">
            Save
          </Button> */}
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(Book);
