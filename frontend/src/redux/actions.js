import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authIsReady: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authentication: (state, action) => {
      return { user: action.payload, authIsReady: true };
    },

    loginAction: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logoutAction: (state, action) => {
      return { ...state, user: null };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authentication, loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
