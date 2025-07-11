import axiosInstance from "./axiosInstance";

async function login(data) {
  console.log('The data is coming out to be: ', data);
  const response = await axiosInstance.post("/auth/local/login", data);
  return response;
}

async function signup(data) {
  const response = await axiosInstance.post("/auth/local/signup", data);
  return response;
}

export {
  login,
  signup,
}
