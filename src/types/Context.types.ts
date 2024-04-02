import type { AuthContextProps } from '@/Providers/AuthProvider';
import type { HistoryContextProps } from '@/Providers/HistoryProvider';

export interface AppContext {
    history?: HistoryContextProps;
    auth?: AuthContextProps;
}
