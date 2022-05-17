import LinearProgress from "@suid/material/LinearProgress";
import MenuBarContainer from "../components/MenuBarContainer.jsx";
import NewsCard from "../components/NewsCard.jsx";
import useScrollableComponent from "../hooks/useScrollableComponent.jsx";
import { createEffect, For, onCleanup } from "solid-js";
import useNewsClient from "../hooks/useNewsClient.jsx";

const MainPage = () => {
  const {
    news,
    loading,
    loadMore,
    subscribeSubreddits,
    unsubscribeSubreddits,
  } = useNewsClient();

  const [scroll, ScrollTargetComponent] = useScrollableComponent();
  const scrolledRecently = false;
  // const { scrolledRecently } = useScrollStopwatch({ seconds: 2 });

  const handleScroll = (e) => {
    const target = e.target.scrollingElement;
    const offset = target.scrollHeight - target.scrollTop;
    const bottom = offset - target.clientHeight < 100;

    if (bottom) {
      loadMore();
    }
  };

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  createEffect(() => {
    if (!loading && !scrolledRecently) {
      scroll();
    }
  });

  return (
    <MenuBarContainer>
      <ScrollTargetComponent />
      <For each={news}>
        {(newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} sx={{ mb: 1 }} />
        )}
      </For>
      <LinearProgress sx={{ visibility: loading ? "visible" : "hidden" }} />
    </MenuBarContainer>
  );
};

export default MainPage;
