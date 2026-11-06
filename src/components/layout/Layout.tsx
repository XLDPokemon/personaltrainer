import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import { Link, Outlet, useLocation } from 'react-router';

const NAV_ITEMS = [
  { label: 'Customers', path: '/', icon: <GroupIcon /> },
  { label: 'Trainings', path: '/trainings', icon: <FitnessCenterIcon /> },
  { label: 'Calendar', path: '/calendar', icon: <CalendarMonthIcon /> },
  { label: 'Statistics', path: '/statistics', icon: <BarChartIcon /> },
];

export default function Layout() {
  const { pathname } = useLocation();
  const activeItem = NAV_ITEMS.find((item) => item.path === pathname);

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 3, flexWrap: 'wrap' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            Personal Trainer
          </Typography>
          <Tabs
            value={activeItem?.path ?? false}
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            slotProps={{ indicator: { sx: { backgroundColor: 'common.white' } } }}
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ label, path, icon }) => (
              <Tab
                key={path}
                label={label}
                value={path}
                icon={icon}
                iconPosition="start"
                component={Link}
                to={path}
                sx={{ minHeight: 64 }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}
