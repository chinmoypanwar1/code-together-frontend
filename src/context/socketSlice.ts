import { createSlice } from "@reduxjs/toolkit";
import { WebsocketProvider } from 'y-websocket';
import { yDoc } from "./yjsSlice";

let provider: WebsocketProvider | null = null;

const initialState = {
  connected: false,
  room: "",
}

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    createRoom: (state, action) => {
      const { roomId } = action.payload;
      provider = new WebsocketProvider("ws://localhost:1234", roomId, yDoc);
      state.connected = true;
      state.room = roomId;
      console.log('The room is created.\n');
    },
    joinRoom: (state, action) => {
      const { roomId } = action.payload;
      provider = new WebsocketProvider("ws://localhost:1234", roomId, yDoc);
      state.connected = true;
      state.room = roomId;
      console.log('The room has been joined.')
    },
    disconnectRoom: (state) => {
      provider?.destroy();
      state.room = "";
      state.connected = false;
    }
  }
})

export const { createRoom, joinRoom, disconnectRoom } = socketSlice.actions
export default socketSlice.reducer
