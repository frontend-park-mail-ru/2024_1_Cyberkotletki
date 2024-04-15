import type { AuthContextValues } from '@/Providers/AuthProvider';
import type { HistoryContextValues } from '@/Providers/HistoryProvider';
import type { ProfileContextValues } from '@/Providers/ProfileProvider';

export interface AppContext {
    history?: HistoryContextValues;
    profile?: ProfileContextValues;
    auth?: AuthContextValues;
}
