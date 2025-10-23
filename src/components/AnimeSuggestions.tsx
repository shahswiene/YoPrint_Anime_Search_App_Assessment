import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Anime } from '../types/anime';
import { getTopAnime, getSeasonNow } from '../services/api';
import AnimeCard from './AnimeCard';
import AnimeCardSkeleton from './AnimeCardSkeleton';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SuggestionSection {
  title: string;
  icon: React.ReactNode;
  data: Anime[];
}

function AnimeSuggestions() {
  const [suggestions, setSuggestions] = useState<SuggestionSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPages, setCurrentPages] = useState<number[]>([0, 0, 0]);
  const trendingRef = useRef<HTMLDivElement | null>(null);
  const topRatedRef = useRef<HTMLDivElement | null>(null);
  const airingRef = useRef<HTMLDivElement | null>(null);
  const scrollContainer1Ref = useRef<HTMLDivElement | null>(null);
  const scrollContainer2Ref = useRef<HTMLDivElement | null>(null);
  const scrollContainer3Ref = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        // Fetch data sequentially with delay to avoid rate limit
        const topAnimeRes = await getTopAnime(1);
        
        // Wait 1 second between requests to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const seasonNowRes = await getSeasonNow(1);

        setSuggestions([
          {
            title: 'Trending Now',
            icon: <TrendingUpIcon sx={{ fontSize: '1.2rem' }} />,
            data: topAnimeRes.data.slice(0, 16),
          },
          {
            title: 'Top Rated Anime',
            icon: <StarIcon sx={{ fontSize: '1.2rem' }} />,
            data: topAnimeRes.data.slice(0, 16),
          },
          {
            title: 'Airing This Season',
            icon: <NewReleasesIcon sx={{ fontSize: '1.2rem' }} />,
            data: seasonNowRes.data.slice(0, 16),
          },
        ]);
      } catch (error: any) {
        console.error('Failed to fetch suggestions:', error);
        // Show error message to user
        if (error?.response?.status === 429) {
          console.warn('Rate limit reached. Please wait a moment and refresh.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
      <Box>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #2C5F5D 0%, #87CEEB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Amazing Anime
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Loading curated collections...
          </Typography>
        </Box>

        {/* Show 3 skeleton sections */}
        {[0, 1, 2].map((sectionIndex) => (
          <Box key={sectionIndex} sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Loading...
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 3,
                minHeight: '600px',
              }}
            >
              {Array.from(new Array(8)).map((_, index) => (
                <AnimeCardSkeleton key={index} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(135deg, #2C5F5D 0%, #87CEEB 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Discover Amazing Anime
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Search for your favorite anime or explore our curated collections
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip
            icon={<TrendingUpIcon />}
            label="Trending"
            onClick={() => scrollToSection(trendingRef)}
            sx={{
              background: 'linear-gradient(135deg, rgba(255, 179, 71, 0.2) 0%, rgba(255, 182, 193, 0.2) 100%)',
              border: '1px solid rgba(255, 179, 71, 0.3)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
                background: 'linear-gradient(135deg, rgba(255, 179, 71, 0.3) 0%, rgba(255, 182, 193, 0.3) 100%)',
              },
            }}
          />
          <Chip
            icon={<StarIcon />}
            label="Top Rated"
            onClick={() => scrollToSection(topRatedRef)}
            sx={{
              background: 'linear-gradient(135deg, rgba(44, 95, 93, 0.2) 0%, rgba(135, 206, 235, 0.2) 100%)',
              border: '1px solid rgba(44, 95, 93, 0.3)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(44, 95, 93, 0.3)',
                background: 'linear-gradient(135deg, rgba(44, 95, 93, 0.3) 0%, rgba(135, 206, 235, 0.3) 100%)',
              },
            }}
          />
          <Chip
            icon={<NewReleasesIcon />}
            label="Airing Now"
            onClick={() => scrollToSection(airingRef)}
            sx={{
              background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.2) 0%, rgba(155, 136, 176, 0.2) 100%)',
              border: '1px solid rgba(74, 124, 89, 0.3)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(74, 124, 89, 0.3)',
                background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.3) 0%, rgba(155, 136, 176, 0.3) 100%)',
              },
            }}
          />
        </Box>
      </Box>

      {suggestions.map((section, index) => {
        const sectionRef = index === 0 ? trendingRef : index === 1 ? topRatedRef : airingRef;
        const scrollContainerRef = index === 0 ? scrollContainer1Ref : index === 1 ? scrollContainer2Ref : scrollContainer3Ref;
        const currentPage = currentPages[index];
        const itemsPerPage = 8; // 2 rows x 4 columns
        const totalPages = Math.ceil(section.data.length / itemsPerPage);
        
        const handlePrevious = () => {
          setCurrentPages((prev) => {
            const newPages = [...prev];
            newPages[index] = Math.max(0, newPages[index] - 1);
            return newPages;
          });
        };
        
        const handleNext = () => {
          setCurrentPages((prev) => {
            const newPages = [...prev];
            newPages[index] = Math.min(totalPages - 1, newPages[index] + 1);
            return newPages;
          });
        };
        
        const visibleItems = section.data.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
        );

        return (
          <Box key={index} ref={sectionRef} sx={{ mb: 6, scrollMarginTop: '100px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {section.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {section.title}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(44, 95, 93, 0.2)',
                      transform: 'scale(1.1)',
                    },
                    '&.Mui-disabled': {
                      opacity: 0.3,
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: '50px', textAlign: 'center' }}>
                  {currentPage + 1} / {totalPages}
                </Typography>
                <IconButton
                  onClick={handleNext}
                  disabled={currentPage >= totalPages - 1}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(44, 95, 93, 0.2)',
                      transform: 'scale(1.1)',
                    },
                    '&.Mui-disabled': {
                      opacity: 0.3,
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box
              ref={scrollContainerRef}
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: 3,
                minHeight: '600px',
              }}
            >
              {visibleItems.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default AnimeSuggestions;
