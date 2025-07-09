import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import FileEditor from "./FileEditor";
import TodoManager from "./TodoManager";
import Toolbar from "./Toolbar";
import { getFileSystem, getTodos, sendFileChanges, sendTodoChanges} from "../../api/playground";
import { setInitialState, setInitialTodoState } from "../../context/yjsSlice";
import { objFileDiff, objTodoDiff, setupYjsObserver } from "../../utils/yjs";
import { yDoc } from "../../context/yjsSlice";
import { updateFileSystemFromYjs, updatePrevFileSystemFromYjs, updatePrevTodosFromYjs, updateTodosFromYjs } from "../../context/playgroundSlice";

function debounceCallback(fn: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

export default function Playground() {

  const dispatch = useAppDispatch();
  const { FileSystem, prevFileSystem, todos, prevTodos } = useAppSelector(state => state.playground)

  useEffect(() => {
    const url = new URLSearchParams(window.location.search)
    const projectId = url.get('projectId');
    const isVisitor = url.get('visitor') === 'true';
    if (!projectId && !isVisitor) return;

    console.log('I am occuring now');

    if (isVisitor && yDoc) {
      const yfs = yDoc?.getMap('filesystem');
      const json = yfs?.toJSON();
      if (json?.filesystem) {
        console.log('Syncing is happening now.')
        dispatch(updateFileSystemFromYjs(json?.filesystem));
        setupYjsObserver();
      }
    }

    const getInitialFileSystem = async () => {
      try {
        const response = await getFileSystem(projectId);
        dispatch(setInitialState(response.data));

        const root = yDoc?.getMap("filesystem");
        const json = root?.toJSON();
        dispatch(updateFileSystemFromYjs(json?.filesystem));
        dispatch(updatePrevFileSystemFromYjs(json?.filesystem));
        setupYjsObserver();
      } catch (error) {
        console.log(error);
      }
    };

    const getInitialTodos = async () => {
      try {
        const response = await getTodos(projectId);
        console.log('This is the todos response: ', response);
        dispatch(setInitialTodoState(response.data));
        const root = yDoc?.getMap("todos");
        const json = root?.toJSON();
        dispatch(updateTodosFromYjs(json?.todos));
        dispatch(updatePrevTodosFromYjs(json?.todos));
      } catch (error) {
        console.log(error);
      }
    };

    if (!isVisitor) {
      getInitialFileSystem();
      getInitialTodos();
    }

  }, [dispatch]);

  const sendToBackend = async () => {
    const url = new URLSearchParams(window.location.search);
    const projectId = url.get('projectId');
    const isVisitor = url.get('visitor') === 'true';

    if (!projectId || isVisitor) return;
    if (!FileSystem || !prevFileSystem) return;

    const fileSystemChanges = objFileDiff(prevFileSystem[0], FileSystem[0]);
    const todosChanges = objTodoDiff(prevTodos, todos);
    if (fileSystemChanges.length === 0) {
      console.log('No changes to send.');
      return;
    }
    if (todosChanges.length === 0) {
      console.log('No changes to send.');
      return;
    }

    try {
      console.log('FileChanges sent:', fileSystemChanges);
      const fileResponse = await sendFileChanges(projectId, fileSystemChanges);
      console.log(fileResponse);
      console.log('TodoChanges sent:', todosChanges);
      const todoResponse = await sendTodoChanges(projectId, todosChanges);
      console.log(todoResponse);
      dispatch(updatePrevFileSystemFromYjs(FileSystem));
      dispatch(updatePrevTodosFromYjs(todos));
    } catch (err) {
      console.error('Error sending changes:', err);
    }
  };

  useEffect(() => {
    const url = new URLSearchParams(window.location.href);
    const isVisitor = url.get('visitor') === 'true';
    const projectId = url.get('projectId');
    if (isVisitor || !projectId) return;
    const debouncedSend = debounceCallback(sendToBackend, 5000);
    debouncedSend();
  }, [FileSystem, todos])

  const activeComponent = useAppSelector((state) => state.playground.activeComponent);

  return (
    <div className="w-screen h-screen flex flex-row">
      <Toolbar />
      {activeComponent === "file-editor" && <FileEditor />}
      {activeComponent === "todo" && <TodoManager />}
    </div>
  );
}

