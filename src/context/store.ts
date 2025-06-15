import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import { loadState, saveState } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: {
    user: loadState() || {
      userId: "",
      username: "",
      email: "",
      profilePictureUrl: "",
      isAuthenticated: false,
    },
  }
})

store.subscribe(() => {
  saveState(store.getState().user);
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
