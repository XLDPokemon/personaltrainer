import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router';
import NavigationDrawer from './NavigationDrawer';

const DRAWER_WIDTH = 220;

export default function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { breakpoints } = useTheme();
  const isLargeScreen = useMediaQuery(breakpoints.up('md'));

  return (
    <>
      <NavigationDrawer
        open={isDrawerOpen}
        variant={isLargeScreen ? 'persistent' : 'temporary'}
        width={DRAWER_WIDTH}
        onClose={() => setIsDrawerOpen(false)}
      />
      {/* On large screens the page moves aside so the open menu does not cover it. */}
      <Box
        sx={{
          ml: isLargeScreen && isDrawerOpen ? `${DRAWER_WIDTH}px` : 0,
          transition: (theme) => theme.transitions.create('margin-left'),
        }}
      >
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen((isOpen) => !isOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xl" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
