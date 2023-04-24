import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import starshipsReducer from "../starships/starshipsSlice";
import charactersReducer from "../characters/charactersSlice";
import planetssReducer from "../planets/planetsSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    planets: planetssReducer,
    starships: starshipsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
