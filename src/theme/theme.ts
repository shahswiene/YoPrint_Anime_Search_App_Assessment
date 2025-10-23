import { createTheme } from '@mui/material/styles';

// Ghibli-inspired colors with Apple Liquid concept
// Soft, natural colors inspired by Studio Ghibli films
const ghibliColors = {
  skyBlue: '#87CEEB',      // Soft sky blue (Howl's Moving Castle)
  forestGreen: '#4A7C59',  // Deep forest green (Princess Mononoke)
  warmCream: '#F5F5DC',    // Warm cream (Totoro's belly)
  sunsetOrange: '#FFB347', // Gentle sunset orange
  cloudWhite: '#FAFAFA',   // Soft cloud white
  twilightPurple: '#9B88B0', // Evening twilight
  earthBrown: '#8B7355',   // Natural earth tone
  mistGray: '#E8E8E8',     // Morning mist
  deepTeal: '#2C5F5D',     // Deep ocean teal
  softPink: '#FFB6C1',     // Gentle pink (Ponyo)
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: ghibliColors.deepTeal,
      light: ghibliColors.skyBlue,
      dark: ghibliColors.forestGreen,
      contrastText: ghibliColors.cloudWhite,
    },
    secondary: {
      main: ghibliColors.sunsetOrange,
      light: ghibliColors.softPink,
    },
    background: {
      default: '#F0F4F8',
      paper: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#546E7A',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: `${ghibliColors.twilightPurple} ${ghibliColors.mistGray}`,
          background: 'linear-gradient(135deg, #F0F4F8 0%, #E8F0F7 50%, #F5F5DC 100%)',
          backgroundAttachment: 'fixed',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(232, 232, 232, 0.3)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #87CEEB 0%, #2C5F5D 100%)',
            borderRadius: '10px',
            '&:hover': {
              background: 'linear-gradient(180deg, #2C5F5D 0%, #4A7C59 100%)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '16px',
          fontWeight: 600,
          padding: '12px 28px',
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(135deg, rgba(44, 95, 93, 0.9) 0%, rgba(74, 124, 89, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 15px rgba(44, 95, 93, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(44, 95, 93, 0.3)',
            background: 'linear-gradient(135deg, rgba(44, 95, 93, 1) 0%, rgba(74, 124, 89, 1) 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(44, 95, 93, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 60px rgba(44, 95, 93, 0.25)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(135, 206, 235, 0.5)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(135, 206, 235, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(135, 206, 235, 0.5)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(44, 95, 93, 0.6)',
              boxShadow: '0 4px 20px rgba(44, 95, 93, 0.15)',
            },
            '& fieldset': {
              border: 'none',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          fontWeight: 600,
        },
      },
    },
  },
});
