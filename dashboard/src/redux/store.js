import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import socketSlice from "./slices/socketSlice";
import chatSlice from "./slices/chatSlice";

const rootReducer = combineReducers({
  user: userSlice,
  socket: socketSlice,
  chat: chatSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["socket", "chat"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
