import { App } from './App/App.js';

if (document.readyState !== 'loading') {
    App();
} else {
    document.addEventListener('DOMContentLoaded', App);
}
