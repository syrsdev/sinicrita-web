import Echo from "laravel-echo";
import Pusher from "pusher-js";
import api from "./axios.service";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}
window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY,
  authorizer: (channel: { name: any }) => {
    return {
      authorize: (
        socketId: string,
        callback: (error: boolean, data: any) => void
      ) => {
        api
          .post("broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
  wsHost: import.meta.env.VITE_REVERB_HOST as string,
  wsPort: (import.meta.env.VITE_REVERB_PORT as unknown as number) ?? 80,
  wssPort: (import.meta.env.VITE_REVERB_PORT as unknown as number) ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
});
export default window.Echo;
