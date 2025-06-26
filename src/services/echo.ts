import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// Penting: supaya cookie Sanctum ikut dikirim
axios.defaults.withCredentials = true;

declare global {
  interface Window {
    Pusher: any;
  }
}

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
  wsPort: parseInt(import.meta.env.VITE_REVERB_PORT || '8080'),
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  authEndpoint: 'http://localhost:8000/broadcasting/auth',
  auth: {
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(
        document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1] || ''
      ),
    },
  },
});

export default echo;
