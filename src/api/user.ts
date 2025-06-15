import axiosInstance from "./axiosInstance";

async function getUserDetails() {
  try {
    const response = await axiosInstance.get("/users/userDetails");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getUserDetails,
}
