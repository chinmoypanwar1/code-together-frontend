import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import playgroundReducer from "./playgroundSlice";
import yjsReducer from "./yjsSlice";
import socketReducer from "./socketSlice"
import { loadState, saveState } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    playground: playgroundReducer,
    yjs: yjsReducer,
    socket: socketReducer,
  },
  preloadedState: {
    user: loadState("userState") || {
      userId: "",
      username: "",
      email: "",
      profilePictureUrl: "",
      isAuthenticated: false,
    },
    project: loadState("projectState") || {
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
  // saveState(store.getState().user, "userState")
  // saveState(store.getState().project, "projectState")
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
