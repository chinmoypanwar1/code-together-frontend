import axiosInstance from "./axiosInstance";

async function getFileSystem(projectId: string) {
  try {
    const response = await axiosInstance.get(`/editor/initialFileSystem/${projectId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getTodos(projectId: string) {
  try {
    const response = await axiosInstance.get(`/editor/initialTodos/${projectId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
}

async function sendFileChanges(projectId: string, changes) {
  try {
    const response = await axiosInstance.patch(`/editor/syncFileChanges/${projectId}`, {
      changes: changes,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function sendTodoChanges(projectId: string, changes) {
  try {
    const response = await axiosInstance.patch(`/editor/syncTodoChanges/${projectId}`, {
      changes: changes,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
}

export {
  getFileSystem,
  getTodos,
  sendFileChanges,
  sendTodoChanges
}
