import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosConfigToken from "../../helpers/axiosConfigToken";

// Handle token and set user
export const handleJWT = (token, history, dispatch) => {
  // let success = true;

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
    type: "signin",
    payload: decodedUser
  });
};

// Sign In User
export const signInUser = (formData, history, dispatch) => {
  return axios
    .post("/api/auth/signin", formData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      handleJWT(token, history, dispatch);
    })
    .catch(err => err);
};

// Sign Up User
export const signUpUser = (formData, history, dispatch) => {
  return axios
    .post("/api/auth/signup", formData)
    .then(res => history.push("/sign/in"))
    .catch(err => err);
};
