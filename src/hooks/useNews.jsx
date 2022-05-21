import { createContext, createSignal, useContext } from "solid-js";
import { createLocalSignal } from "../util/util";
import useNewsResource from "./useNewsResource";
import useNewsWebsocket from "./useNewsWebsocket";

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider(props) {
  const [news, setNews] = createSignal([]);
  const [subreddits, setSubreddits] = createLocalSignal("subreddits", []);

  const { loading, loadMore } = useNewsResource(
    subreddits,
    onNewsResourceResponse
  );

  const { sendMessage } = useNewsWebsocket(
    onConnect,
    onNewsMessage
  );

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
  }

  function unsubscribeReddit(subredditsUnsub) {
    sendMessage({
      action: "UNSUBSCRIBE",
      channel: "REDDIT",
      subChannels: subredditsUnsub,
    });

    setSubreddits((subreddits) =>
      subreddits.filter(
        (subreddit) => !subredditsUnsub.includes(subreddit)
      )
    );
  }

  const store = [
    news,
    loading,
    loadMore,
    subscribeReddit,
    unsubscribeReddit,
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
