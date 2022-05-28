import { createContext, createSignal, useContext } from "solid-js";
import { filterByPrimitiveMerger, uniqueByIdMerger } from "../util/merger";
import { createLocalSignal } from "../util/util";
import { useNewsResource } from "./useNewsResource";
import { useNewsWebsocket } from "./useNewsWebsocket";

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider(props) {
  const [news, setNews] = createSignal([]);
  const [subreddits, setSubreddits] = createLocalSignal("subreddits", []);

  const { loading, loadMore, resetQuery } = useNewsResource(
    subreddits,
    onNewsResourceResponse
  );

  const { sendMessage } = useNewsWebsocket(onConnect, onNewsMessage);

  function onNewsResourceResponse(news) {
    setNews(uniqueByIdMerger(news));
  }

  function onConnect() {
    sendMessage({
      action: "SUBSCRIBE",
      channel: "REDDIT",
      subChannels: subreddits(),
    });
  }

  function onNewsMessage(newsItem) {
    setNews((news) => [newsItem, ...news]);
  }

  function subscribeReddit(subredditsSub) {
    // todo validate if subreddit exists

    sendMessage({
      action: "SUBSCRIBE",
      channel: "REDDIT",
      subChannels: subredditsSub,
    });

    setSubreddits([...subredditsSub, ...subreddits()]);
    reloadNews();
  }

  function unsubscribeReddit(subreddits) {
    sendMessage({
      action: "UNSUBSCRIBE",
      channel: "REDDIT",
      subChannels: subreddits,
    });
    setSubreddits(filterByPrimitiveMerger(subreddits));
    reloadNews();
  }

  function reloadNews() {
    setNews([]);
    resetQuery();
    loadMore();
  }

  const store = {
    news,
    loading,
    loadMore,
    subscribeReddit,
    unsubscribeReddit,
    subreddits,
    resetQuery
  };

  return (
    <NewsContext.Provider value={store}>{props.children}</NewsContext.Provider>
  );
}
