import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, InputAdornment, TextField, IconButton, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
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
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                paddingLeft: '8px',
                paddingRight: '4px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              '& .MuiInputAdornment-positionStart': {
                marginRight: isSearchExpanded ? '8px' : '0',
              },
              '& input': {
                cursor: isSearchExpanded ? 'text' : 'pointer',
                padding: isSearchExpanded ? '8px 0' : '0',
                width: isSearchExpanded ? 'auto' : '0',
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
