import axios, { CancelTokenSource } from 'axios';
import { SearchResponse, AnimeDetailResponse } from '../types/anime';
import { cache } from '../utils/cache';

const API_BASE_URL = 'https://api.jikan.moe/v4';

// Store cancel token for search requests
let searchCancelToken: CancelTokenSource | null = null;

export const searchAnime = async (
  query: string,
  page: number = 1,
  genreId?: number | null
): Promise<SearchResponse> => {
  // Build cache key based on whether genre is included
  const cacheKey = genreId 
    ? `search_${query}_${page}_genre_${genreId}`
    : `search_${query}_${page}`;
  const cachedData = cache.get<SearchResponse>(cacheKey);
  
  if (cachedData) {
    console.log('Returning cached search results for:', query, genreId ? `(genre: ${genreId})` : '');
    return cachedData;
  }

  // Cancel previous request if exists
  if (searchCancelToken) {
    searchCancelToken.cancel('New search initiated');
  }

  // Create new cancel token
  searchCancelToken = axios.CancelToken.source();

  try {
    const params: any = {
      q: query,
      page: page,
      limit: 24,
    };

    // Add genre filter if provided
    if (genreId) {
      params.genres = genreId;
    }

    const response = await axios.get<SearchResponse>(
      `${API_BASE_URL}/anime`,
      {
        params,
        cancelToken: searchCancelToken.token,
      }
    );
    
    // Cache the response for 30 minutes
    cache.set(cacheKey, response.data, 30);
    
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Request cancelled');
    }
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  // Check cache first
  const cacheKey = `anime_${id}`;
  const cachedData = cache.get<AnimeDetailResponse>(cacheKey);
  
  if (cachedData) {
    console.log('Returning cached anime details for ID:', id);
    return cachedData;
  }

  try {
    const response = await axios.get<AnimeDetailResponse>(
      `${API_BASE_URL}/anime/${id}`
    );
    
    // Cache anime details for 60 minutes (longer TTL for details)
    cache.set(cacheKey, response.data, 60);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopAnime = async (page: number = 1): Promise<SearchResponse> => {
  // Check cache first
  const cacheKey = `top_anime_${page}`;
  const cachedData = cache.get<SearchResponse>(cacheKey);
  
  if (cachedData) {
    console.log('Returning cached top anime for page:', page);
    return cachedData;
  }

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
    
    // Cache top anime for 60 minutes
    cache.set(cacheKey, response.data, 60);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSeasonNow = async (page: number = 1): Promise<SearchResponse> => {
  // Check cache first
  const cacheKey = `season_now_${page}`;
  const cachedData = cache.get<SearchResponse>(cacheKey);
  
  if (cachedData) {
    console.log('Returning cached season now for page:', page);
    return cachedData;
  }

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
    
    // Cache season now for 30 minutes (shorter TTL as it changes more frequently)
    cache.set(cacheKey, response.data, 30);
    
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
