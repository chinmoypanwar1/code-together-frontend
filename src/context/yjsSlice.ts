import { createSlice } from "@reduxjs/toolkit";
import type { FileListItem } from "../vite-env";
import * as Y from 'yjs';
import { convertToYMap, convertToYArray, generateId } from "../utils/redux";

export let yDoc = null as Y.Doc | null;
export let previousYDoc = null as Y.Doc | null;

function findById(
  map: Y.Map<FileListItem>,
  targetId: string
): Y.Map<FileListItem> | null {
  if (map.get('id') === targetId) return map;
  const children = map.get('children');
  if (children instanceof Y.Array) {
    for (const child of children.toArray()) {
      const found = findById(child, targetId);
      if (found) return found;
    }
  }
  return null;
}

const initialState = {}

const yjsSlice = createSlice({
  name: 'yjs',
  initialState,
  reducers: {
    setInitialDocument: (state) => {
      yDoc = new Y.Doc();
      previousYDoc = new Y.Doc();
      console.log('The Y Document is set now.')
    },
    setInitialState: (state, action) => {
      yDoc = new Y.Doc();
      // FS initialization
      const yfs = yDoc.getMap('filesystem');
      const rootMap = convertToYMap(action.payload);
      yfs.set('filesystem', rootMap);
      console.log('The fileSystem turns out to be: ', yfs.toJSON());
    },
    setInitialTodoState: (state, action) => {
      // Todos initialization
      if (!yDoc) yDoc = new Y.Doc();
      const yTodos = yDoc?.getMap('todos');
      if (!yTodos.has('todos')) {
        yTodos.set('todos', new Y.Array());
      }
      console.log('Todos action payload: ', action.payload);
      const rootArray = convertToYArray(action.payload);
      yTodos?.set('todos', rootArray);
      console.log('Todos from yjs slice', yTodos?.get('todos'))
    },
    createYjsItem: (state, action) => {

      const { parentId, name, type } = action.payload;
      if (!yDoc) return;

      const yfs = yDoc.getMap<FileListItem>('filesystem');
      const root = yfs.get('filesystem');
      if (!root) return;

      // 3. find the parent anywhere in the tree
      const parent = findById(root, parentId);
      if (!parent) {
        console.warn("Parent not found:", parentId);
        return;
      }

      // 4. build the new file/dir
      const fileMap = new Y.Map<FileListItem>();
      fileMap.set('id', generateId());
      fileMap.set('type', type);
      fileMap.set('name', name);
      fileMap.set('content', type === 'file' ? new Y.Text() : undefined);
      fileMap.set('children', type === 'directory' ? new Y.Array() : null);

      // 5. attach it
      const ch = parent.get('children');
      if (ch instanceof Y.Array) {
        ch.push([fileMap]);
      } else {
        const newArr = new Y.Array<Y.Map<FileListItem>>();
        newArr.push([fileMap]);
        parent.set('children', newArr);
      }
    },
    deleteYjsItem: (state, action) => {
      const { id } = action.payload;
      if (!yDoc) return;

      const yfs = yDoc.getMap<FileListItem>('filesystem');
      const root = yfs.get('filesystem');
      if (!root) return;

      // 6. recursive deletion
      function deleteRec(cur: Y.Map<FileListItem>): boolean {
        const children = cur.get('children');
        if (children instanceof Y.Array) {
          const arr = children.toArray();
          const idx = arr.findIndex(c => c.get('id') === id);
          if (idx > -1) {
            children.delete(idx);
            return true;
          }
          for (const c of arr) {
            if (deleteRec(c)) return true;
          }
        }
        return false;
      }

      // 7. if root itself matches, clear it
      if (root.get('id') === id) {
        yfs.delete('filesystem');
      } else {
        deleteRec(root);
      }
    },
    addTodo: (state, action) => {
      if (!yDoc) return;

      const yMap = yDoc.getMap('todos');
      let yTodos = yMap.get('todos');

      // If it's not initialized for some reason, fix it
      if (!yTodos) {
        yTodos = new Y.Array();
        yMap.set('todos', yTodos);
      }

      const { title, content, status } = action.payload;
      const todosMap = new Y.Map();
      todosMap.set('id', generateId());
      todosMap.set('title', title);
      todosMap.set('content', content);
      todosMap.set('status', status);

      yTodos.push([todosMap]);

      console.log('CREATE: ', [...yTodos.toArray()]);
    },
    updateTodo: (state, action) => {
      if (!yDoc) return;

      const yMap = yDoc.getMap('todos');
      const yTodos = yMap.get('todos');
      if (!yTodos) return;

      const { newTitle, newContent, newStatus, id } = action.payload;
      const todo = yTodos.toArray().find(t => t.get('id') === id);
      if (todo instanceof Y.Map) {
        todo.set('title', newTitle);
        todo.set('content', newContent);
        todo.set('status', newStatus);
      }
    },
    toggleTodo: (state, action) => {
      if (!yDoc) return;

      const yMap = yDoc.getMap('todos');
      const yTodos = yMap.get('todos');
      if (!yTodos) return;

      const { id } = action.payload;
      const todo = yTodos.toArray().find(t => t.get('id') === id);
      if (todo instanceof Y.Map) {
        const currentStatus = todo.get('status');
        todo.set('status', currentStatus === 'Done' ? 'Pending' : 'Done');
      }
    },
    deleteTodo: (state, action) => {
      if (!yDoc) return;

      const yMap = yDoc.getMap('todos');
      const yTodos = yMap.get('todos');
      if (!yTodos) return;

      const { id } = action.payload;
      const index = yTodos.toArray().findIndex(t => t.get('id') === id);
      if (index !== -1) {
        yTodos.delete(index, 1);
      }
    }
  }
})

export const { setInitialState, setInitialTodoState, createYjsItem, deleteYjsItem, setInitialDocument, addTodo, updateTodo, deleteTodo, toggleTodo } = yjsSlice.actions
export default yjsSlice.reducer;
