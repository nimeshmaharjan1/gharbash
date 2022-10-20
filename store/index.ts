import { configureStore } from "@reduxjs/toolkit";

import homesSlice from "./modules/homes.slice";

export const store = configureStore({
  reducer: {
    homesStore: homesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
