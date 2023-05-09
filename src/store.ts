import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //    Ignore these action types
        ignoredActions: [],
        //    Ignore these field paths in all actions
        // ignoredActionPaths: [],
        //    Ignore these paths in the state
        // ignoredPaths: [],
      },
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
