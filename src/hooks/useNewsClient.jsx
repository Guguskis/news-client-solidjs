import { createEffect, createResource, createSignal } from "solid-js";

function useNewsClient() {
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

  createEffect(() => {
    if (response()) {
      setNews(uniqueByIdMerger(response().news));
      setNextPageToken(response().nextPageToken);
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

function uniqueByIdMerger(newItems) {
  return (array) => {
    return array.concat(
      newItems.filter((n) => {
        return !array.find((a) => a.id === n.id);
      })
    );
  };
}
