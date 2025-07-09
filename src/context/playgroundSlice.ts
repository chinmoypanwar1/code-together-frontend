import { createSlice } from "@reduxjs/toolkit";
import type { FileListItem, Todo } from "../vite-env";

const initialState = {
  activeComponent: 'file-editor',
  prevFileSystem: null as FileListItem[] | null,
  FileSystem: null as FileListItem[] | null,
  prevTodos: null as Todo[] | null,
  todos: null as Todo[] | null,
  activeFile: null as FileListItem | null,
  expandedDirectory: [] as string[]
};

const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    setActiveComponent: (state, action) => {
      if (action.payload !== state.activeComponent) {
        state.activeComponent = action.payload;
      }
    },
    updateFileSystemFromYjs: (state, action) => {
      state.FileSystem = [action.payload];
      console.log([...state.FileSystem]);
    },
    updatePrevFileSystemFromYjs: (state, action) => {
      const data = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.prevFileSystem = data;
    },
    updateTodosFromYjs: (state, action) => {
      state.todos = action.payload;
      console.log('Playground todos comes out to be: ', [...state.todos]);
    },
    updatePrevTodosFromYjs: (state, action) => {
      state.prevTodos = action.payload;
      console.log('Playground previous todos comes out to be: ', [...state.prevTodos]);
    },
    setActiveFile: (state, action) => {
      const fileId = action.payload;
      state.activeFile = fileId;
    },
    toggleDirectory: (state, action) => {
      const directoryId = action.payload;
      console.log(directoryId);
      const index = state.expandedDirectory.findIndex(id => id===directoryId)

      if(index===-1) state.expandedDirectory.push(directoryId); 
      else state.expandedDirectory.splice(index, 1);
    }
  }
})

export const { setActiveComponent, updateFileSystemFromYjs, setActiveFile, toggleDirectory, updatePrevFileSystemFromYjs, updateTodosFromYjs, updatePrevTodosFromYjs } = playgroundSlice.actions;
export default playgroundSlice.reducer;
