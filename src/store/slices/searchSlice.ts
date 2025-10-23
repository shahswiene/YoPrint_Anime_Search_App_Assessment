import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Anime, SearchResponse } from '../../types/anime';
import { searchAnime } from '../../services/api';

interface SearchState {
  query: string;
  results: Anime[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  selectedGenre: number | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  selectedGenre: null,
};

export const fetchAnimeSearch = createAsyncThunk<
  SearchResponse,
  { query: string; page: number },
  { rejectValue: string }
>(
  'search/fetchAnimeSearch',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await searchAnime(query, page);
      return response;
    } catch (error: any) {
      if (error.message === 'Request cancelled') {
        throw error;
      }
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch anime'
      );
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setGenre: (state, action: PayloadAction<number | null>) => {
      state.selectedGenre = action.payload;
      state.currentPage = 1;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.currentPage = 1;
      state.error = null;
      state.selectedGenre = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
        state.currentPage = action.payload.pagination.current_page;
      })
      .addCase(fetchAnimeSearch.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message !== 'Request cancelled') {
          state.error = action.payload || 'An error occurred';
        }
      });
  },
});

export const { setQuery, setPage, setGenre, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
