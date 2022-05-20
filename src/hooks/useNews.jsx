import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext
} from "solid-js";
import { createLocalSignal } from "../util/util";
import useRedditWebsocket from "./useWebsocket";

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider(props) {
  const [news, setNews] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [nextPageToken, setNextPageToken] = createSignal(0);
  const [subreddits, setSubreddits] = createLocalSignal("subreddits", []);

  const [response, { refetch }] = createResource(async () => {
    if (nextPageToken() === null) return;

    setLoading(true);
    const url = new URL(`http://86.100.240.140:9081/api/news`);

    url.searchParams.set("pageToken", nextPageToken());
    url.searchParams.set("subChannels", subreddits().join(","));
    url.searchParams.set("pageSize", 20);

    const response = await fetch(url);
    return await response.json();
  });

  const { send: sendReddit } = useRedditWebsocket(onConnect, onMessage);

  createEffect(() => {
    if (response()) {
      setNews(uniqueByIdMerger(response().news));
      setNextPageToken(response().nextPageToken);
      setLoading(false);
    }
  });

  function onConnect() {
    sendReddit({
      action: "SET",
      subreddits: subreddits(),
    });
  }

  function loadMore() {
    if (loading()) return;
    refetch();
  }

  function onMessage(newsItem) {
    setNews((news) => [newsItem, ...news]);
  }

  function subscribeSubreddits(subredditsToSubscribe) {
    // todo validate if subreddit exists

    sendReddit({
      action: "SUBSCRIBE",
      subreddits: subredditsToSubscribe,
    });

    setSubreddits([...subredditsToSubscribe, ...subreddits()]);
  }

  function unsubscribeSubreddits(subredditsToUnsubscribe) {
    sendReddit(message = {
      action: "UNSUBSCRIBE",
      subreddits: subredditsToUnsubscribe,
    });
    
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
