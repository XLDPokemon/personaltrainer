import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import { Link, useLocation } from 'react-router';

type NavigationDrawerProps = {
  open: boolean;
  /** "persistent" sits beside the page, "temporary" opens over it. */
  variant: 'persistent' | 'temporary';
  width: number;
  onClose: () => void;
};

const NAV_ITEMS = [
  { label: 'Customers', path: '/', icon: <GroupIcon /> },
  { label: 'Trainings', path: '/trainings', icon: <FitnessCenterIcon /> },
  { label: 'Calendar', path: '/calendar', icon: <CalendarMonthIcon /> },
  { label: 'Statistics', path: '/statistics', icon: <BarChartIcon /> },
];

export default function NavigationDrawer({ open, variant, width, onClose }: NavigationDrawerProps) {
  const { pathname } = useLocation();

  return (
    <Drawer
      open={open}
      variant={variant}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width, boxSizing: 'border-box' } }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="Close navigation menu" onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, path, icon }) => (
          <ListItemButton
            key={path}
            component={Link}
            to={path}
            selected={pathname === path}
            aria-current={pathname === path ? 'page' : undefined}
            onClick={variant === 'temporary' ? onClose : undefined}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
