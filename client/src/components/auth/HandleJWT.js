import React from "react";
import PropTypes from "prop-types";
import { handleJWT } from "./AuthActions";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";

const HandleJWT = props => {
  handleJWT(props.match.params.token, props.history);
  // if (Object.keys(props.auth.errors).length > 0) {
  // props.clearAuthErrors();
  // props.history.push("/page-not-found");
  // } else if (props.auth.isAuthenticated) {
  //   props.history.push("/booklist");
  // }
  return <Spinner />;
};

export default withRouter(HandleJWT);
