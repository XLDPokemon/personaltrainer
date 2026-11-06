import LinearProgress from '@mui/material/LinearProgress';
import { createHashRouter } from 'react-router';
import Layout from './components/layout/Layout';
import CustomersPage from './pages/CustomersPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import TrainingsPage from './pages/TrainingsPage';

// GitHub Pages cannot serve browser-router paths on a page reload, so routes live in the URL hash.
export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LinearProgress />,
    children: [
      { index: true, element: <CustomersPage /> },
      { path: 'trainings', element: <TrainingsPage /> },
      // The calendar and chart libraries are large, so they load only when opened.
      {
        path: 'calendar',
        lazy: async () => ({ Component: (await import('./pages/CalendarPage')).default }),
      },
      {
        path: 'statistics',
        lazy: async () => ({ Component: (await import('./pages/StatisticsPage')).default }),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
