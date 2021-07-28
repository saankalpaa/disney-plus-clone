import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchList: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.watchList = action.payload.watchList;
    },
  },
});

export const { setList } = listSlice.actions;

export const selectList = (state) => state.list.watchList;

export default listSlice.reducer;