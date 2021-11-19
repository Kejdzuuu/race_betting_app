import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Participant } from "../../types";
import * as participantsService from "../../services/participants";
import { RootState } from "../../store";

const initialState: Participant[] = [];

export const fetchParticipants = createAsyncThunk(
  "participants/fetchAllStatus",
  async (thunkAPI) => {
    const participants = await participantsService.getAll();
    return participants;
  }
);

export const getParticipants = (state: RootState) => state.participants;

export const selectParticipants = (
  state: RootState,
  indexes: number[] | undefined
) => {
  if (indexes === undefined) return undefined;
  return state.participants.data.filter((participant) =>
    indexes.includes(participant.id)
  );
};

export const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    status: "idle",
    data: initialState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default participantsSlice.reducer;
