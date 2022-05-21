import { createEffect, createSignal } from "solid-js";
import Stomp from "stompjs";

function useNewsWebsocket(onConnect, onMessage) {
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

export default useNewsWebsocket;
