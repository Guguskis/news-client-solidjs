import { createEffect, createResource, createSignal } from "solid-js";

export function useNewsResource(subChannels, onResponse) {
  const [nextPageToken, setNextPageToken] = createSignal(0);
  const [loading, setLoading] = createSignal(false);

  const [response, { refetch }] = createResource(async () => {
    if (nextPageToken() === null) return;

    setLoading(true);
    const url = new URL(`${import.meta.env.VITE_NEWS_SERVICE_API_URL}/api/news`);

    url.searchParams.set("pageToken", nextPageToken());
    url.searchParams.set("subChannels", subChannels().join(","));
    url.searchParams.set("pageSize", 20);

    const response = await fetch(url);
    return await response.json();
  });

  createEffect(() => {
    if (response()) {
      onResponse(response().news);
      setNextPageToken(response().nextPageToken);
      setLoading(false);
    }
  });

  function loadMore() {
    if (loading()) return;
    refetch();
  }

  function resetQuery() {
    setNextPageToken(0);
  }

  return { loading, loadMore, resetQuery };
}