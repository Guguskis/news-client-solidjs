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

  const { loading: loadingNews, loadMore: loadMoreNews } = useNewsResource(
    subreddits,
    onNewsResourceResponse
  );

  const { sendMessage } = useNewsWebsocket(
    onConnect,
    onRedditMessage
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

  function onRedditMessage(newsItem) {
    setNews((news) => [newsItem, ...news]);
  }

  function subscribeSubreddits(subredditsToSubscribe) {
    // todo validate if subreddit exists

    sendMessage({
      action: "SUBSCRIBE",
      channel: "REDDIT",
      subChannels: subredditsToSubscribe,
    });

    setSubreddits([...subredditsToSubscribe, ...subreddits()]);
  }

  function unsubscribeSubreddits(subredditsToUnsubscribe) {
    sendMessage({
      action: "UNSUBSCRIBE",
      channel: "REDDIT",
      subChannels: subredditsToUnsubscribe,
    });

    setSubreddits((subreddits) =>
      subreddits.filter(
        (subreddit) => !subredditsToUnsubscribe.includes(subreddit)
      )
    );
  }

  const store = [
    news,
    loadingNews,
    loadMoreNews,
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
