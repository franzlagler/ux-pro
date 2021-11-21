import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loading: true,
};

export const checkSession = createAsyncThunk(
  'loggedIn/checkSession',
  async () => {
    const response = await fetch('/api/checkSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const validSession = await response.json();

    if (validSession.message) {
      return true;
    }

    return false;
  },
);

export const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    });
  },
});

export const { logIn, logOut } = loggedInSlice.actions;
export default loggedInSlice.reducer;
