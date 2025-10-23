import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Skeleton,
  AppBar,
  Toolbar,
  Modal,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TvIcon from '@mui/icons-material/Tv';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAnimeDetail, clearDetail } from '../store/slices/detailSlice';
import ErrorMessage from '../components/ErrorMessage';

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { anime, loading, error } = useAppSelector((state) => state.detail);
  const [theaterMode, setTheaterMode] = useState(false);

  const handleOpenTheater = () => setTheaterMode(true);
  const handleCloseTheater = () => setTheaterMode(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(parseInt(id)));
    }

    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    if (id) {
      dispatch(fetchAnimeDetail(parseInt(id)));
    }
  };

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Search
        </Button>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Container>
    );
  }

  if (loading || !anime) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" width={120} height={36} sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
            gap: 4,
          }}
        >
          <Box>
            <Skeleton variant="rectangular" height={500} />
          </Box>
          <Box>
            <Skeleton variant="text" width="60%" height={60} />
            <Skeleton variant="text" width="40%" height={40} />
            <Box sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" height={200} />
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 20px rgba(44, 95, 93, 0.08)',
        }}
      >
        <Toolbar sx={{ minHeight: '70px' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2C5F5D 0%, #4A7C59 50%, #87CEEB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px',
            }}
          >
            ✨ AnimeVerse
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
          variant="contained"
        >
          Back to Search
        </Button>

        <Box>
          {/* Title Section */}
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            {anime.title}
          </Typography>

          {anime.title_english && anime.title_english !== anime.title && (
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              {anime.title_english}
            </Typography>
          )}

          {anime.title_japanese && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {anime.title_japanese}
            </Typography>
          )}

          {/* Trailer Section - Below Title */}
          {anime.trailer?.embed_url && (
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '42%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  border: '2px solid rgba(135, 206, 235, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    border: '2px solid rgba(44, 95, 93, 0.6)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(44, 95, 93, 0.2)',
                  },
                }}
                onClick={handleOpenTheater}
              >
                <iframe
                  src={anime.trailer.embed_url}
                  title="Anime Trailer"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '12px',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                >
                  <PlayCircleOutlineIcon
                    sx={{
                      fontSize: '80px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))',
                    }}
                  />
                </Box>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                  color: 'text.secondary',
                }}
              >
                Click to watch in theater mode
              </Typography>
            </Box>
          )}

          {/* Main Content Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
              gap: 4,
            }}
          >
            <Box>
              <Box
                component="img"
                src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                alt={anime.title}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              />
            </Box>

            <Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              {anime.score && (
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      <StarIcon sx={{ color: '#ffd700', mr: 0.5 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {anime.score.toFixed(1)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Score
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {anime.rank && (
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      #{anime.rank}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ranked
                    </Typography>
                  </CardContent>
                </Card>
              )}

              {anime.popularity && (
                <Card sx={{ minWidth: 120 }}>
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      #{anime.popularity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Popularity
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TvIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">
                      <strong>Type:</strong> {anime.type}
                    </Typography>
                  </Box>
                  {anime.episodes && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Episodes:</strong> {anime.episodes}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Status:</strong> {anime.status}
                  </Typography>
                </Box>

                <Box>
                  {anime.aired?.string && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        <strong>Aired:</strong> {anime.aired.string}
                      </Typography>
                    </Box>
                  )}
                  {anime.season && anime.year && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Season:</strong> {anime.season} {anime.year}
                    </Typography>
                  )}
                  {anime.duration && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Duration:</strong> {anime.duration}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>

            {anime.genres.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Genres
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {anime.genres.map((genre) => (
                    <Chip
                      key={genre.mal_id}
                      label={genre.name}
                      sx={{
                        background: 'linear-gradient(135deg, rgba(44, 95, 93, 0.15) 0%, rgba(135, 206, 235, 0.15) 100%)',
                        color: '#2C5F5D',
                        fontWeight: 600,
                        border: '1px solid rgba(44, 95, 93, 0.3)',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {anime.synopsis && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Synopsis
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {anime.synopsis}
                </Typography>
              </Box>
            )}

            {anime.background && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Background
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {anime.background}
                </Typography>
              </Box>
            )}

            {anime.studios.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Studios
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {anime.studios.map((studio) => (
                    <Chip
                      key={studio.mal_id}
                      label={studio.name}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      </Container>

      {/* Theater Mode Modal */}
      <Modal
        open={theaterMode}
        onClose={handleCloseTheater}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '90vw',
            height: '90vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            borderRadius: 2,
            overflow: 'hidden',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleCloseTheater}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {anime?.trailer?.embed_url && (
            <iframe
              src={`${anime.trailer.embed_url}?autoplay=1`}
              title="Anime Trailer Theater Mode"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allowFullScreen
              allow="autoplay"
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default DetailPage;
