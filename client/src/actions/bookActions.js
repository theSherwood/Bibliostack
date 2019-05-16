import axios from "axios";

import {} from "./types";

// Get books
export const getBooks = books => dispatch => {
  axios.get("/api/books", books).then(res => console.log(res.data));
  // .then(books => console.log(books));
};
