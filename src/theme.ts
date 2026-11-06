import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#0f766e' },
    background: { default: '#f5f7f7' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
  },
});
