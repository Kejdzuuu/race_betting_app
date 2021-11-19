import { configureStore } from "@reduxjs/toolkit";
import racesReducer from "./reducers/races/racesSlice";
import participantsReducer from "./reducers/participants/participantsSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    races: racesReducer,
    participants: participantsReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDDispatch = typeof store.dispatch;

export default store;
