import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Race } from "../../types";
import * as raceService from "../../services/races";
import { RootState } from "../../store";

const initialState: Race[] = [];

export const fetchRaces = createAsyncThunk(
  "races/fetchAllStatus",
  async (thunkAPI) => {
    const races = await raceService.getAll();
    return races;
  }
);

export const getAllRaces = (state: RootState) => state.races.data;

export const getActiveRaces = (state: RootState) =>
  state.races.data.filter((race) => race.active);

export const getNotActiveRaces = (state: RootState) =>
  state.races.data.filter((race) => !race.active);

export const getRace = (state: RootState, id: number) =>
  state.races.data.find((race) => race.id === id);

export const racesSlice = createSlice({
  name: "races",
  initialState: {
    status: "idle",
    data: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRaces.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRaces.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default racesSlice.reducer;
