import axios, { CancelTokenSource } from 'axios';
import { SearchResponse, AnimeDetailResponse } from '../types/anime';

const API_BASE_URL = 'https://api.jikan.moe/v4';

// Store cancel token for search requests
let searchCancelToken: CancelTokenSource | null = null;

export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  // Cancel previous request if exists
  if (searchCancelToken) {
    searchCancelToken.cancel('New search initiated');
  }

  // Create new cancel token
  searchCancelToken = axios.CancelToken.source();

  try {
    const response = await axios.get<SearchResponse>(
      `${API_BASE_URL}/anime`,
      {
        params: {
          q: query,
          page: page,
          limit: 24,
        },
        cancelToken: searchCancelToken.token,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request cancelled');
    }
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  try {
    const response = await axios.get<AnimeDetailResponse>(
      `${API_BASE_URL}/anime/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopAnime = async (page: number = 1): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(
      `${API_BASE_URL}/top/anime`,
      {
        params: {
          page: page,
          limit: 24,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSeasonNow = async (page: number = 1): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(
      `${API_BASE_URL}/seasons/now`,
      {
        params: {
          page: page,
          limit: 24,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAnimeByGenre = async (
  genreId: number,
  page: number = 1
): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(
      `${API_BASE_URL}/anime`,
      {
        params: {
          genres: genreId,
          page: page,
          limit: 24,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
