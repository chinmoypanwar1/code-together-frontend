import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  username: "",
  email: "",
  profilePictureUrl: "",
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userId, username, email, profilePictureUrl } = action.payload;
      console.log("From the userSlice: ", action.payload);
      state.userId = userId;
      state.username = username;
      state.email = email;
      state.profilePictureUrl = profilePictureUrl;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userId = "";
      state.username = "";
      state.email = "";
      state.profilePictureUrl = "";
      state.isAuthenticated = false;
    }
  }
})

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
