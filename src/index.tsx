import { App } from '@/App';
import { createRoot } from '@/core/app-dom';

createRoot(document.getElementById('root'), <App />);

if ('serviceWorker' in navigator) {
    // eslint-disable-next-line no-console
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}
