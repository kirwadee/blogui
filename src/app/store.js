import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    post: postReducer,
  },
  devTools: false,
});
