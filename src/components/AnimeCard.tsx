import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../types/anime';
import StarIcon from '@mui/icons-material/Star';

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${anime.mal_id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
        alt={anime.title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3.6em',
          }}
        >
          {anime.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {anime.score && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: '#ffd700', fontSize: '1.2rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {anime.score.toFixed(1)}
              </Typography>
            </Box>
          )}
          {anime.type && (
            <Chip
              label={anime.type}
              size="small"
              sx={{
                background: 'linear-gradient(135deg, rgba(44, 95, 93, 0.15) 0%, rgba(135, 206, 235, 0.15) 100%)',
                color: '#2C5F5D',
                fontWeight: 600,
                border: '1px solid rgba(44, 95, 93, 0.3)',
              }}
            />
          )}
        </Box>

        {anime.episodes && (
          <Typography variant="body2" color="text.secondary">
            {anime.episodes} episodes
          </Typography>
        )}

        {anime.synopsis && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {anime.synopsis}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default AnimeCard;
