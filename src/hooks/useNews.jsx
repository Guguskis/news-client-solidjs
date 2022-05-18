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

  const [response, { refetch }] = createResource(async () => {
    setLoading(true);
    const response = await fetch(
      `http://86.100.240.140:9081/api/news?pageToken=${nextPageToken()}&pageSize=10`
    );
    return await response.json();
  });

  const [websocket] = createSignal(
    Stomp.client("ws://86.100.240.140:9081/news/websocket")
  );

  createEffect(() => {
    if (response()) {
      setNews(uniqueByIdMerger(response().news));
      setNextPageToken(response().nextPageToken);
      setLoading(false);
    }
  });

  function subscribeNews(frame) {
    websocket().subscribe("/user/topic/news", (message) => {
      // todo stale closure
      const newsItem = JSON.parse(message.body);
      console.log("WEBSOCEKT NEWS", newsItem);
      setNews(uniqueByIdMerger([newsItem]));
    });
  }

  createEffect(() => {
    if (!websocket()) return;
    websocket().connect({}, subscribeNews);
  });

  function loadMore() {
    if (loading()) return;
    refetch();
  }

  function subscribeSubreddits() {
    throw new Error("Not implemented");
  }

  function unsubscribeSubreddits() {
    throw new Error("Not implemented");
  }

  const store = [
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
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
