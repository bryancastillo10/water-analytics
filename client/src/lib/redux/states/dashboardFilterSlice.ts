import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SiteDataState {
  siteOptions: string[];
  selectedSiteName: string | null;
  selectedSiteId: string | null;
}

const initialState: SiteDataState = {
  siteOptions: [],
  selectedSiteName: null,
  selectedSiteId: null,
};

const dashboardFilterSlice = createSlice({
  name: 'dashboardFilter',
  initialState,
  reducers: {
    setSiteData: (state, action: PayloadAction<{ id: string | null; siteName: string | null }>) => {
      state.selectedSiteId = action.payload.id;
      state.selectedSiteName = action.payload.siteName;
    },
    clearSiteData: state => {
      state.selectedSiteId = null;
      state.selectedSiteName = null;
    },
    setSiteOptions: (state, action: PayloadAction<string[]>) => {
      state.siteOptions = action.payload;
    },
  },
});

export const { setSiteData, clearSiteData, setSiteOptions } = dashboardFilterSlice.actions;

export default dashboardFilterSlice.reducer;
