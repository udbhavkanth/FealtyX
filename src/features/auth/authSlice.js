import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userId: "u-1", role: "guest" },
  reducers: {
    setRole(state, action) {
      state.role = action.payload;          // 'developer' | 'manager'
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
