import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { IStarship } from "./types";
import { STATUS } from "../../constants";
import { getIdFromUrl } from "../../utils";
import { fetchStarship } from "../../services/service";

export interface StarshipsState {
  starships: IStarship[];
  status: string;
}

const initialState: StarshipsState = {
  starships: [],
  status: STATUS.IDLE,
};

export const getStarship = createAsyncThunk(
  "starships/fetchStarship",
  async (id: number, thunkAPI) => {
    try {
      const response: IStarship = await fetchStarship(id);
      return response;
    } catch (error: any) {
      const message: string = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const starshipsSlice = createSlice({
  name: "starship",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getStarship.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getStarship.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        if (
          !state.starships.find((planet) => planet.url === action.payload.url)
        ) {
          state.starships.push({
            ...action.payload,
            id: getIdFromUrl(action.payload.url),
          });
        }
      })
      .addCase(getStarship.rejected, (state) => {
        state.status = STATUS.FAILED;
      });
  },
});

export const selectStarships = (state: RootState) => state.starships;

export default starshipsSlice.reducer;
