import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Anime } from '../../types/anime';
import { getAnimeById } from '../../services/api';

interface DetailState {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailState = {
  anime: null,
  loading: false,
  error: null,
};

export const fetchAnimeDetail = createAsyncThunk<
  Anime,
  number,
  { rejectValue: string }
>(
  'detail/fetchAnimeDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAnimeById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch anime details'
      );
    }
  }
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.anime = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { clearDetail } = detailSlice.actions;
export default detailSlice.reducer;
