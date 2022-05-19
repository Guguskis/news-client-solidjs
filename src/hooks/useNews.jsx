import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import Stomp from "stompjs";

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider(props) {
  const [news, setNews] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [nextPageToken, setNextPageToken] = createSignal(0);
  const [wsConnected, setWsConnected] = createSignal(false);
  const [subreddits, setSubreddits] = createSignal([]);

  const [response, { refetch }] = createResource(async () => {
    setLoading(true);
    const response = await fetch(
      `http://86.100.240.140:9081/api/news?pageToken=${nextPageToken()}&pageSize=10`
    );
    return await response.json();
  });

  const [websocket, setWebsocket] = createSignal(
    Stomp.client("ws://86.100.240.140:9081/news/websocket")
  );

  createEffect(() => {
    if (response()) {
      setNews(uniqueByIdMerger(response().news));
      setNextPageToken(response().nextPageToken);
      setLoading(false);
    }
  });

  createEffect(() => {
    websocket().connect({}, onWebsocketConnect);
  });

  createEffect(() => {
    if (!wsConnected()) return;
    websocket().subscribe("/user/topic/news", onSubscriptionMessage);
  });

  function onWebsocketConnect() {
    setWsConnected(true);
    sendInitialSubscription(); // todo unsure if subreddits() gets stale if we load data from localStorage
  }

  function sendInitialSubscription() {
    const message = {
      action: "SET",
      subreddits: subreddits(),
    };

    websocket().send("/app/queue/news/reddit", {}, JSON.stringify(message));
  }

  function loadMore() {
    if (loading()) return;
    refetch();
  }

  function onSubscriptionMessage(message) {
    const newsItem = JSON.parse(message.body);
    setNews((news) => [newsItem, ...news]);
  }

  function subscribeSubreddits(subredditsToSubscribe) {
    // todo validate if subreddit exists

    const message = {
      action: "SUBSCRIBE",
      subreddits: subredditsToSubscribe,
    };

    websocket().send("/app/queue/news/reddit", {}, JSON.stringify(message));
    setSubreddits([...subredditsToSubscribe, ...subreddits()]);
  }

  function unsubscribeSubreddits(subredditsToUnsubscribe) {
    const message = {
      action: "UNSUBSCRIBE",
      subreddits: subredditsToUnsubscribe,
    };

    websocket().send("/app/queue/news/reddit", {}, JSON.stringify(message));
    setSubreddits((subreddits) =>
      subreddits.filter(
        (subreddit) => !subredditsToUnsubscribe.includes(subreddit)
      )
    );
  }

  const store = [
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
    subreddits,
  ];

  return (
    <NewsContext.Provider value={store}>{props.children}</NewsContext.Provider>
  );
}

function uniqueByIdMerger(newItems) {
  return (array) => {
    return array.concat(
      newItems.filter((n) => {
        return !array.find((a) => a.id === n.id);
      })
    );
  };
}
