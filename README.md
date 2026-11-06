# Personal Trainer

Front end for a personal trainer company's customer database, built as the final task of the Haaga-Helia Front End Programming course. It uses the [Personal Trainer REST API](https://juhahinkula.github.io/personaltrainerdocs/).

## Features

- **Customers:** list, search, sort and filter; add, edit and delete with validation and a yes/no confirmation; export all customers to CSV
- **Trainings:** list with customer names and dates formatted as dd.mm.yyyy hh:mm; search, sort and filter; add with a date picker; delete with a yes/no confirmation; view one customer's trainings
- **Calendar:** trainings by month, week, day or agenda, with details on selection
- **Statistics:** a bar chart of minutes per activity, the same totals in a table, and summary figures
- **Empty database:** the customers page offers to restore the demo data when there are no customers
- Success and error notifications for every change, and loading and retry states for every list

## Technologies

| Purpose | Library |
| --- | --- |
| Application | React, TypeScript, Vite |
| Components | Material UI |
| Tables and CSV export | MUI X Data Grid |
| Date and time input | MUI X Date Pickers, Day.js |
| Bar chart | MUI X Charts |
| Grouping and sums | Lodash |
| Calendar | React Big Calendar |
| Routing | React Router |
| Server state | TanStack Query |
| Unit tests | Vitest |
| Deployment | gh-pages |

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The app opens at http://localhost:5173.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run the linter |
| `npm test` | Run the unit tests |
| `npm run deploy` | Build and publish to GitHub Pages |

## Architecture

Each layer only depends on the ones below it, so pages stay short and request details stay in one place.

```text
pages            One component per route. Combines components and decides which dialog is open.
  components     What the user sees, grouped by feature. Shared pieces are in common/.
    hooks        Fetching and updating data with TanStack Query, with notifications and refreshes.
      api        REST requests and mapping API responses to the app's types.
utils            Pure, unit tested functions for formatting, validation and calculations.
```

```text
src/
  api/             client (shared request code), customers, trainings, database
  components/
    calendar/      TrainingCalendar, TrainingDetailsDialog
    common/        ConfirmDialog, DataTable, LoadError, PageHeader
    customers/     CustomerTable, CustomerFormDialog, EmptyDatabaseNotice
    layout/        Layout (app bar and navigation)
    statistics/    ActivityChart, ActivityTable, StatTile
    trainings/     TrainingTable, TrainingFormDialog
  context/         Notifications shown across the app
  hooks/           useCustomers, useTrainings, useResetDatabase, useApiMutation
  pages/           CustomersPage, TrainingsPage, CalendarPage, StatisticsPage, error pages
  test/            Helpers for unit tests
  utils/           calendar, format, trainings, validation
  main.tsx         App entry point and providers
  router.tsx       Routes
  theme.ts         Material UI theme
  types.ts         Shared data types
```

## Deployment

The app is published to GitHub Pages with the `gh-pages` package. It uses a hash router, because GitHub Pages cannot serve other paths when a page is reloaded, and relative asset paths, so it runs under any repository name.

```bash
npm run deploy
```

The app is then available at `https://{username}.github.io/{repository}/`.
