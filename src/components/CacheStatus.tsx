import { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip, Chip } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { cache } from '../utils/cache';

function CacheStatus() {
  const [cacheSize, setCacheSize] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCacheSize = () => {
      const size = cache.getSize();
      setCacheSize(size);
    };

    updateCacheSize();
    const interval = setInterval(updateCacheSize, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleClearCache = () => {
    cache.clear();
    setCacheSize(0);
    console.log('Cache cleared');
  };

  if (!isVisible && cacheSize === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Tooltip title="Cache storage size">
        <Chip
          icon={<StorageIcon />}
          label={formatBytes(cacheSize)}
          size="small"
          onClick={() => setIsVisible(!isVisible)}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        />
      </Tooltip>

      {isVisible && cacheSize > 0 && (
        <Tooltip title="Clear cache">
          <IconButton
            size="small"
            onClick={handleClearCache}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: 'error.main',
              },
            }}
          >
            <DeleteSweepIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default CacheStatus;
