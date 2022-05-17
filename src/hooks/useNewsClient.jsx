import { createEffect, createResource, createSignal } from "solid-js";

function useNewsClient() {
  const [news, setNews] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [nextPageToken, setNextPageToken] = createSignal(0);

  const [newsResource, { refetch }] = createResource(async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:9081/api/news?pageToken=${nextPageToken()}&pageSize=10`
    );
    const body = await response.json();
    setNextPageToken(body.nextPageToken);
    return body.news;
  });

  createEffect(() => {
    if (newsResource()) {
      setNews((news) => news.concat(newsResource()));
      setLoading(false);
    }
  });

  function loadMore() {
    if (loading()) return;
    refetch();
  }

  function subscribeSubreddits() {}
  function unsubscribeSubreddits() {}

  return {
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
  };
}

export default useNewsClient;
