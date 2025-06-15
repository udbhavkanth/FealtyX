import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore }   from "redux-persist";
import storage                            from "redux-persist/lib/storage";

import authReducer  from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import uiReducer    from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  auth:  authReducer,
  tasks: tasksReducer,
  ui:    uiReducer,
});

const persistedReducer = persistReducer(
  { key: "root", storage },   // ← localStorage + cross-tab sync
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);
