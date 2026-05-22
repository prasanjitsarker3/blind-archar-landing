import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  sidebarCollapsed: boolean;
  locale: string;
};

const initialState: UIState = {
  sidebarCollapsed: false,
  locale: "en",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
  },
});

export const { setSidebarCollapsed, setLocale } = uiSlice.actions;
export default uiSlice.reducer;
