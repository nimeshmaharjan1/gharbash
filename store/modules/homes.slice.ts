import { Home } from "@lib/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addHome = createAsyncThunk("homes/create", async (body: Home, thunkAPI) => {
  try {
    const home = await axios.post("/api/homes", body);
    return JSON.parse(JSON.stringify(home));
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const homesStore = createSlice({
  name: "homes",
  initialState: {
    homes: [],
    isHomesLoading: false,
    createdHome: {},
    homesError: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(addHome.pending, (state) => {
      state.createdHome = {};
      state.isHomesLoading = true;
    });
    builder.addCase(addHome.fulfilled, (state, { payload }) => {
      state.createdHome = payload;
      state.isHomesLoading = false;
    });
    builder.addCase(addHome.rejected, (state, action) => {
      state.createdHome = {};
      state.isHomesLoading = false;
    });
  },
});

export default homesStore.reducer;
