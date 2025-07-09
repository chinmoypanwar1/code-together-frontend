import { yDoc } from "../context/yjsSlice";
import { store } from "../context/store";
import { updateFileSystemFromYjs, updateTodosFromYjs } from "../context/playgroundSlice";
import type { FileListItem, Todo } from "../vite-env";

export const setupYjsObserver = () => {
  const yfs = yDoc?.getMap('filesystem');
  const ytodos = yDoc?.getMap('todos');
  if (!yfs) return;
  if (!ytodos) return;

  yfs.observeDeep(() => {
    const yRoot = yfs.toJSON();
    console.log('Yjs deep update detected');
    setTimeout(() => {
      store.dispatch(updateFileSystemFromYjs(yRoot.filesystem));
    }, 0)
  });
  ytodos.observeDeep(() => {
    const yTodos = ytodos?.toJSON();
    setTimeout(() => {
      store.dispatch(updateTodosFromYjs(yTodos.todos));
    }, 0)
  })
};

export const objFileDiff = (obj1: FileListItem, obj2: FileListItem, basePath = '') => {
  let changes = [];

  const children1 = obj1.children || [];
  const children2 = obj2.children || [];

  // CREATE, RENAME, TEXT DIFF
  for (const item2 of children2) {
    const match = children1.find(item1 => item1.id === item2.id);
    const currentPath = `${basePath}/${item2.name}`;

    if (!match) {
      changes.push({
        operation: 'create',
        path: currentPath,
        type: item2.type,
        content: item2.type === 'file' ? item2.content : null,
      });

      if (item2.type === 'directory') {
        changes.push(...objFileDiff({ children: [] }, item2, currentPath));
      }

      continue;
    }

    if (match.name !== item2.name) {
      changes.push({
        operation: 'rename',
        oldPath: `${basePath}/${match.name}`,
        newPath: currentPath,
        type: item2.type,
      });
    }

    // TEXT DIFF → Only rhs (new content)
    if (
      item2.type === 'file' &&
      typeof match.content === 'string' &&
      typeof item2.content === 'string' &&
      match.content !== item2.content
    ) {
      changes.push({
        operation: 'edit',
        path: currentPath,
        content: item2.content,
      });
    }

    if (item2.type === 'directory') {
      changes.push(...objFileDiff(match, item2, currentPath));
    }
  }

  // DELETE
  for (const item1 of children1) {
    const match = children2.find(item2 => item2.id === item1.id);
    const currentPath = `${basePath}/${item1.name}`;

    if (!match) {
      if (item1.type === 'directory') {
        changes.push(...objFileDiff(item1, { children: [] }, currentPath));
      }

      changes.push({
        operation: 'delete',
        path: currentPath,
        type: item1.type,
      });
    }
  }

  return changes;
};

export const objTodoDiff = (obj1: Todo[], obj2: Todo[]) => {
  let changes = [];

  const map1 = new Map(obj1.map(todo => [todo.id, todo]));
  const map2 = new Map(obj2.map(todo => [todo.id, todo]));

  // Creation check
  for (const [id, todo] of map2) {
    if (!map1.has(id)) {
      changes.push({
        operation: 'create',
        title: todo.title,
        content: todo.content,
        status: todo.status,
      })
    }
  }

  // Deletion check
  for (const [id, todo] of map1) {
    if (!map2.has(id)) {
      changes.push({
        operation: 'delete',
        title: todo.title,
        content: todo.content,
        status: todo.status,
      })
    }
  }

  // Updation check
  for (const [id, newTodo] of map2) {
    const oldTodo = map1.get(id);
    if (
      oldTodo &&
      (oldTodo.title !== newTodo.title ||
        oldTodo.content !== newTodo.content ||
        oldTodo.status !== newTodo.status)
    ) {
      changes.push(
        {
          operation: 'update',
          title: newTodo.title,
          content: newTodo.content,
          status: newTodo.status,
          oldTitle: oldTodo.title,
        }
      );
    }
  }

  return changes;

}
