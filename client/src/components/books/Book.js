import React, { useEffect, useRef, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const initialState = {
  fetching: false,
  ebayBookResult: [],
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { ...state, fetching: true };
    case "setEbayBookResult":
      return { ...state, fetching: false, ebayBookResult: action.payload };
    case "clearResult":
      return { ...state, ebayBookResult: [] };
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
    alignItems: "center"
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
  }
});

const Book = props => {
  const { fetchResults, classes, expand } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(expand);
  }, [expand]);

  useEffect(() => {
    if (fetchResults) {
      dispatch({ type: "fetching" });
      const body = {
        title: "the lord of the rings",
        author: "Tolkien",
        price: ""
      };
      axios
        .post("/api/books/book", body)
        .then(res => {
          const books = res.data;
          dispatch({ type: "setEbayBookResult", payload: books });
        })
        .catch(err => dispatch({ type: "setError", payload: err }));
    }
  }, [fetchResults]);

  const handlePanelClick = e => {
    if (
      !(
        e.target.matches(".MuiInputBase-input-178") ||
        e.target.matches(".MuiInput-input-163")
      )
    ) {
      setExpanded(!expanded);
    }
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary
          onClick={handlePanelClick}
          expandIcon={<ExpandMoreIcon />}
        >
          <TextField />
          <TextField />
          <TextField />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {state.fetching ? <p>Fetching results...</p> : null}
          {state.error ? state.error.message : null}
          <ul>
            {state.ebayBookResult.map(book => {
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
        </ExpansionPanelDetails>
        {/* <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Save
          </Button>
        </ExpansionPanelActions> */}
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(Book);
