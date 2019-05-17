import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosConfigToken from "../../helpers/axiosConfigToken";

// Handle token and set user
export const handleJWT = (token, history, dispatch) => {
  let success = true;
  try {
    // Add 'Bearer' to tokens from Oauth process
    if (!token.startsWith("Bearer ")) {
      token = "Bearer " + token;
    }
    // Decode token for user data
    const decodedUser = jwt_decode(token);
    localStorage.setItem("jwtToken", token);
    // Configure axios Authorization header
    axiosConfigToken(token);
    // Set user
    dispatch({
      type: "login",
      payload: decodedUser
    });
  } catch (err) {
    success = false;
    console.log(err);
    // dispatch({
    //   type: GET_AUTH_ERRORS,
    //   payload: err.message
    // });
  }
  // Redirect to challenges
  if (success) history.push("/booklist");
};

// props.handleJWT(props.match.params.token, props.history);
// if (Object.keys(props.auth.errors).length > 0) {
//   props.clearAuthErrors();
//   props.history.push("/page-not-found");
// } else if (props.auth.isAuthenticated) {
//   props.history.push("/");
// }

// Sign In User
export const signInUser = (formData, history, dispatch) => {
  axios
    .post("/api/auth/signin", formData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      dispatch(handleJWT(token, history));
    })
    .catch(err => {
      console.log(err);
      // dispatch({
      //   type: GET_AUTH_ERRORS,
      //   payload: err.response.data
      // });
    });
};

// Sign Out user
export const signOutUser = dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove token from axios header
  axiosConfigToken(false);
  // Set user to empty object
  dispatch({ type: "signout" });
};

// Sign Up user
export const signUpUser = (formData, history, dispatch) => {
  axios
    .post("/api/auth/signup", formData)
    .then(res => history.push("/booklist"))
    .catch(
      err => console.log(err)
      // dispatch({
      //   type: GET_AUTH_ERRORS,
      //   payload: err.response.data
      // })
    );
};
