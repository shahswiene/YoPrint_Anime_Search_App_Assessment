import { Box, Chip } from '@mui/material';

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 36, name: 'Slice of Life' },
  { id: 37, name: 'Supernatural' },
  { id: 41, name: 'Thriller' },
];

interface GenreFilterProps {
  selectedGenre: number | null;
  onGenreSelect: (genreId: number | null) => void;
}

function GenreFilter({ selectedGenre, onGenreSelect }: GenreFilterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        mb: 3,
        justifyContent: 'center',
      }}
    >
      <Chip
        label="All"
        onClick={() => onGenreSelect(null)}
        sx={{
          background: !selectedGenre
            ? 'linear-gradient(135deg, rgba(44, 95, 93, 0.9) 0%, rgba(74, 124, 89, 0.9) 100%)'
            : 'rgba(255, 255, 255, 0.6)',
          color: !selectedGenre ? '#fff' : '#2C5F5D',
          fontWeight: 600,
          border: !selectedGenre
            ? '1px solid rgba(44, 95, 93, 0.5)'
            : '1px solid rgba(135, 206, 235, 0.3)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(44, 95, 93, 0.3)',
          },
        }}
      />
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          onClick={() => onGenreSelect(genre.id)}
          sx={{
            background: selectedGenre === genre.id
              ? 'linear-gradient(135deg, rgba(44, 95, 93, 0.9) 0%, rgba(74, 124, 89, 0.9) 100%)'
              : 'rgba(255, 255, 255, 0.6)',
            color: selectedGenre === genre.id ? '#fff' : '#2C5F5D',
            fontWeight: 600,
            border: selectedGenre === genre.id
              ? '1px solid rgba(44, 95, 93, 0.5)'
              : '1px solid rgba(135, 206, 235, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(44, 95, 93, 0.3)',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default GenreFilter;
