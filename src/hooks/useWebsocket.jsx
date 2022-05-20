import { createEffect, createSignal } from "solid-js";
import Stomp from "stompjs";

function useRedditWebsocket(onConnect, onMessage) {
  const [connected, setConnected] = createSignal(false);
  const [websocket] = createSignal(
    Stomp.client("ws://86.100.240.140:9081/news/websocket")
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
    onConnect(); // todo unsure if subreddits() gets stale if we load data from localStorage
  }

  function onWebsocketMessage(message) {
    const body = JSON.parse(message.body);
    onMessage(body);
  }

  function send(message) {
    websocket().send("/app/queue/news/reddit", {}, JSON.stringify(message));
  }

  return { websocket, send };
}

export default useRedditWebsocket;
