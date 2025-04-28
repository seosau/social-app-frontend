import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // thêm reducer vào đây sau
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
