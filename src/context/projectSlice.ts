import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [
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
}

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setAllProjects: (state, action) => {
      state.project = action.payload;
    },
    createProject: (state, action) => {
      state.project.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.project = state.project.filter((project) => (project.projectId !== action.payload.projectId));
    }
  }
})

export const { setAllProjects, createProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
