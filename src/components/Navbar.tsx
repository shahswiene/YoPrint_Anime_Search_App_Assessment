import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, InputAdornment, TextField, IconButton, Collapse, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isDebouncing?: boolean;
}

function Navbar({ searchQuery, onSearchChange, isDebouncing = false }: NavbarProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleCloseSearch = () => {
    setIsSearchExpanded(false);
    onSearchChange('');
  };

  const handleBlur = () => {
    if (!searchQuery) {
      setTimeout(() => {
        if (!searchQuery) {
          setIsSearchExpanded(false);
        }
      }, 200);
    }
  };

  // ESC key to close search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchExpanded) {
        setIsSearchExpanded(false);
        onSearchChange('');
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSearchExpanded, onSearchChange]);

  return (
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
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
        <Collapse in={!isSearchExpanded} orientation="horizontal">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2C5F5D 0%, #4A7C59 50%, #87CEEB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 10px rgba(44, 95, 93, 0.2)',
              letterSpacing: '-0.5px',
            }}
          >
            ✨ AnimeVerse
          </Typography>
        </Collapse>

        <Box
          sx={{
            width: isSearchExpanded ? '100%' : '40px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            ml: isSearchExpanded ? 0 : 'auto',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleSearchClick}
            onBlur={handleBlur}
            placeholder={isSearchExpanded ? "Search anime..." : ""}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment 
                  position="start"
                  sx={{
                    pointerEvents: isSearchExpanded ? 'none' : 'auto',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={handleSearchClick}
                    sx={{
                      padding: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: isSearchExpanded && (
                <InputAdornment position="end">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {isDebouncing && searchQuery && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CircularProgress size={16} thickness={4} sx={{ color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                          250ms
                        </Typography>
                      </Box>
                    )}
                    <IconButton 
                      size="small" 
                      onClick={handleCloseSearch}
                      sx={{
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                paddingLeft: isSearchExpanded ? '12px' : '8px',
                paddingRight: isSearchExpanded ? '12px' : '4px',
                height: '40px',
                display: 'flex',
                justifyContent: isSearchExpanded ? 'space-between' : 'center',
                alignItems: 'center',
              },
              '& .MuiInputAdornment-positionStart': {
                marginRight: isSearchExpanded ? '12px' : '0',
                marginLeft: 0,
              },
              '& .MuiInputAdornment-positionEnd': {
                marginLeft: isSearchExpanded ? '12px' : '0',
              },
              '& input': {
                cursor: isSearchExpanded ? 'text' : 'pointer',
                padding: '8px 0',
                width: isSearchExpanded ? '100%' : '0',
                flex: isSearchExpanded ? 1 : 0,
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
