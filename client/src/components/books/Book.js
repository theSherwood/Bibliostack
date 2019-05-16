import React, { useEffect, useState, useRef, useReducer } from "react";
// import { connect } from "react-redux";
// import { getBooks } from "../../actions/bookActions";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const initialState = {
  fetching: false,
  ebayBookResult: [],
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { fetching: true };
    case "setEbayBookResult":
      return { fetching: false, ebayBookResult: action.payload };
    case "clearResult":
      return { ebayBookResult: [] };
    case "setError":
      return { fetching: false, error: action.payload };
    case "clearError":
      return { error: null };
    default:
      return state;
  }
}

const Book = props => {
  const { getBooks } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const scriptElmnt = useRef(null);

  useEffect(() => {
    const body = {
      title: "the lord of the rings",
      author: "Tolkien",
      price: ""
    };
    axios
      .post("/api/books/book", body)
      .then(res => {
        const books = res.data;
        console.log(books);
        dispatch({ type: "setEbayBookResult", payload: books });
      })
      .catch(err => dispatch({ type: "setError", payload: err }));
  }, []);

  return (
    <div>
      <TextField onClick={() => console.log("hello")} /> <TextField />{" "}
      <TextField />
      {state.error}
      <ul>
        {state.ebayBookResult.map(book => (
          <li>{book.title[0]}</li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
