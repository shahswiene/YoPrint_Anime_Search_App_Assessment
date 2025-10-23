import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
}

function EmptyState({ message, subMessage }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        textAlign: 'center',
        py: 8,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
      <Typography variant="h4" gutterBottom>
        {message}
      </Typography>
      {subMessage && (
        <Typography variant="body1" color="text.secondary">
          {subMessage}
        </Typography>
      )}
    </Box>
  );
}

export default EmptyState;
