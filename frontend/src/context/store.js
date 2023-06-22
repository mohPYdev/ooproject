import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// Define the initial state
const initialState = {
  user: null,
  authIsReady: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer, applyMiddleware(thunk));
export default store;
