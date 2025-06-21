import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import { loadProjectState, loadUserState, saveProjectState, saveUserState } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
  preloadedState: {
    user: loadUserState() || {
      userId: "",
      username: "",
      email: "",
      profilePictureUrl: "",
      isAuthenticated: false,
    },
    project: loadProjectState() || {
      projects: [
        {
          projectId: "",
          projectName: "",
          languages: "",
          projectTodos: [
            {
              todoId: "",
              title: "",
              content: "",
              status: ""
            }
          ]
        }
      ]
    },
  }
})

store.subscribe(() => {
  saveUserState(store.getState().user);
  saveProjectState(store.getState().project);
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
