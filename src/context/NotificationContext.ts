import { createContext, useContext } from 'react';

export type NotificationSeverity = 'success' | 'error';

export type Notify = (message: string, severity?: NotificationSeverity) => void;

export const NotificationContext = createContext<Notify | null>(null);

export function useNotification(): Notify {
  const notify = useContext(NotificationContext);
  if (!notify) {
    throw new Error('useNotification must be used inside NotificationProvider');
  }
  return notify;
}
