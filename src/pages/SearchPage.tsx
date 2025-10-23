import { useEffect } from 'react';
import {
  Container,
  Box,
  Pagination,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchAnimeSearch,
  setQuery,
  setPage,
  setGenre,
} from '../store/slices/searchSlice';
import useDebounce from '../hooks/useDebounce';
import { onCacheChange } from '../utils/cache';
import Navbar from '../components/Navbar';
import GenreFilter from '../components/GenreFilter';
import AnimeCard from '../components/AnimeCard';
import AnimeCardSkeleton from '../components/AnimeCardSkeleton';
import AnimeSuggestions from '../components/AnimeSuggestions';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import CacheStatus from '../components/CacheStatus';

function SearchPage() {
  const dispatch = useAppDispatch();
  const { query, results, loading, error, currentPage, totalPages, selectedGenre } =
    useAppSelector((state) => state.search);

  const debouncedQuery = useDebounce(query, 250);
  const isDebouncing = query !== debouncedQuery && query.trim() !== '';

  const handleGenreSelect = (genreId: number | null) => {
    dispatch(setGenre(genreId));
  };

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(fetchAnimeSearch({ query: debouncedQuery, page: currentPage }));
    }
  }, [debouncedQuery, currentPage, dispatch]);

  // Listen for cache changes across tabs
  useEffect(() => {
    const unsubscribe = onCacheChange((key, newValue) => {
      console.log('Cache updated in another tab:', key, newValue);
      
      // If search results were updated in another tab, refresh current search
      if (key.startsWith('search_') && debouncedQuery.trim()) {
        dispatch(fetchAnimeSearch({ query: debouncedQuery, page: currentPage }));
      }
    });

    return unsubscribe;
  }, [debouncedQuery, currentPage, dispatch]);

  const handleSearchChange = (value: string) => {
    dispatch(setQuery(value));
    if (currentPage !== 1) {
      dispatch(setPage(1));
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    if (debouncedQuery.trim()) {
      dispatch(fetchAnimeSearch({ query: debouncedQuery, page: currentPage }));
    }
  };

  const renderContent = () => {
    if (error) {
      return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (!query.trim()) {
      return <AnimeSuggestions />;
    }

    if (loading) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {Array.from(new Array(12)).map((_, index) => (
            <AnimeCardSkeleton key={index} />
          ))}
        </Box>
      );
    }

    if (results.length === 0 && debouncedQuery.trim()) {
      return (
        <EmptyState
          message="No Results Found"
          subMessage={`We couldn't find any anime matching "${debouncedQuery}". Try a different search term.`}
        />
      );
    }

    return (
      <>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Found {results.length} results for "{debouncedQuery}"
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {results.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </Box>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </>
    );
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar searchQuery={query} onSearchChange={handleSearchChange} isDebouncing={isDebouncing} />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {query.trim() && (
          <GenreFilter selectedGenre={selectedGenre} onGenreSelect={handleGenreSelect} />
        )}
        {renderContent()}
      </Container>
      
      <CacheStatus />
    </Box>
  );
}

export default SearchPage;
