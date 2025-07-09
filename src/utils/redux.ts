import * as Y from 'yjs';
import type { FileListItem } from '../vite-env';

export const generateId = () => crypto.randomUUID?.() || Math.random().toString(36).substring(2);

export const convertToYMap = (data): Y.Map<FileListItem> => {
  const yMap = new Y.Map();
  yMap.set('id', generateId());
  yMap.set('type', data.type);
  yMap.set('name', data.name);
  const decodedContent = data.content ? atob(data.content) : undefined;
  yMap.set('content', data.type==='file' ? new Y.Text(decodedContent) : undefined);

  if (data.children && data.children.length > 0) {
    const yChildren = new Y.Array<Y.Map<FileListItem>>();
    data.children.forEach((child: any) => {
      yChildren.push([convertToYMap(child)]);
    });
    yMap.set('children', yChildren);
  } else {
    yMap.set('children', null);
  }

  return yMap;
};

export const convertToYArray = (data) => {
  const yArray = new Y.Array();
  if(data.length===0) return yArray;
  for(const todo of data) {
    const todosMap = new Y.Map();
    todosMap.set('id', generateId());
    todosMap.set('title', todo.title);
    todosMap.set('content', todo.content);
    todosMap.set('status', todo.status);
    yArray.push([todosMap]);
  }
  return yArray;
}
