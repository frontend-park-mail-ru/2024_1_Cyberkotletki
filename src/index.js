import { Core } from './core/Core.js';
import { App } from './App/App.js';

if (document.readyState !== 'loading') {
    Core.createRoot(document.getElementById('root'), App());
} else {
    document.addEventListener('DOMContentLoaded', () => {
        Core.createRoot(document.getElementById('root'), App());
    });
}
