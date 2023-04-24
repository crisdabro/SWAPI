import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { ICharacter } from "./types";
import { fetchCharacters } from "./charactersAPI";
import { STATUS } from "../constants";
import { getIdFromUrl } from "../utils";

export interface CharactersState {
  characters: ICharacter[];
  status: string;
}

const initialState: CharactersState = {
  characters: [],
  status: STATUS.IDLE,
};

export const getCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  fetchCharacters
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleFavourite: (state, action: PayloadAction<number>) => {
      const character = state.characters.find(
        (character) => character.id === action.payload
      );
      if (character) {
        character.isFavourite = !character.isFavourite;
      }
    },
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.characters = action.payload.results.map(
          (character: ICharacter) => {
            return {
              ...(character as ICharacter),
              id: getIdFromUrl(character.url),
              planetId: getIdFromUrl(character.homeworld),
              starshipsIds: character.starships.map((url) => getIdFromUrl(url)),
              isFavourite: false,
            };
          }
        );
      })
      .addCase(getCharacters.rejected, (state) => {
        state.status = STATUS.FAILED;
      });
  },
});

export const { toggleFavourite } = charactersSlice.actions;

export const selectCharacters = (state: RootState) => state.characters;

export default charactersSlice.reducer;