import axios from "axios";
import { LocalUrl } from "../utils/constant";

const LOGIN_URL = LocalUrl + "auth/token/login/";
const ME_URL = LocalUrl + "auth/users/me/";
// actions.js
export const authentication = (data) => {
  return (dispatch) => {
    // Perform any asynchronous logic here
    // You can dispatch other actions or make API calls
    dispatch({ type: "AUTH_IS_READY", payload: data });
  };
};

export const loginAction = (data) => {
  return (dispatch) => {
    // Perform any asynchronous logic here
    // You can dispatch other actions or make API calls
    dispatch({ type: "LOGIN", payload: data });
  };
};
export const logoutAction = () => {
  return (dispatch) => {
    // Perform any asynchronous logic here
    // You can dispatch other actions or make API calls
    dispatch({ type: "LOGOUT" });
  };
};
