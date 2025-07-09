/// <reference types="vite/client" />
type FileListItem = {
  id?: string;
  type?: string;
  name?: string;
  content?: string | undefined;
  children?: FileListItem[] | null;
}

type Todo = {
  id: string;
  title: string;
  content: string;
  status: 'Done' | 'Pending';
}

interface Change {
  operation: 'create' | 'delete' | 'rename' | 'edit';
  path: string[];         // Current full path
  oldPath?: string;     // For rename previous path
  newPath?: string;
  type?: FileType;    // For create/delete
  content?: string
}

export { FileListItem, Change, Todo };
