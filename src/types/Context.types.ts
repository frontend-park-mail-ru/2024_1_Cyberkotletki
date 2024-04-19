import type { ContentContextValues } from '@/Providers/ContentProvider';
import type { HistoryContextValues } from '@/Providers/HistoryProvider';
import type { ProfileContextValues } from '@/Providers/ProfileProvider';

export interface AppContext {
    history?: HistoryContextValues;
    profile?: ProfileContextValues;
    content?: ContentContextValues;
}
