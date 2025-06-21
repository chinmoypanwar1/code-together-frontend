import axiosInstance from "./axiosInstance";

async function getAllImages() {
  try {
    const res = await axiosInstance.get("/image/getAllImageDetails")
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function createProject(payload) {
  try {
    const res = await axiosInstance.post("/project/createProject", payload);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function deleteProjectAPI(payload) {
  try {
    const res = await axiosInstance.delete(`/project/deleteProject/${payload.projectId}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getAllImages,
  createProject,
  deleteProjectAPI
}
