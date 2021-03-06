import { createEffect, createSignal } from "solid-js";
import Stomp from "stompjs";

export function useNewsWebsocket(onConnect, onMessage) {
  const [connected, setConnected] = createSignal(false);
  const [websocket] = createSignal(
    Stomp.client(`${import.meta.env.VITE_NEWS_SERVICE_WS_URL}/news/websocket`)
  );

  createEffect(() => {
    if (!connected()) {
      websocket().connect({}, onWebsocketConnect);
    } else {
      websocket().subscribe("/user/topic/news", onWebsocketMessage);
    }
  });

  function onWebsocketConnect() {
    setConnected(true);
    onConnect();
  }

  function onWebsocketMessage(message) {
    const body = JSON.parse(message.body);
    onMessage(body);
  }

  function sendMessage(message) {
    websocket().send("/app/queue/news", {}, JSON.stringify(message));
  }

  return { sendMessage };
}