import LinearProgress from "@suid/material/LinearProgress";
import MenuBarContainer from "../components/MenuBarContainer.jsx";
import NewsCard from "../components/NewsCard.jsx";
import useScrollableComponent from "../hooks/useScrollableComponent.jsx";
import { createEffect, createResource, For, onCleanup } from "solid-js";
import { useNews } from "../hooks/useNews.jsx";

const Home = () => {
  const [news, loading, loadMore] = useNews();

  const [scroll, ScrollTargetComponent] = useScrollableComponent();
  const scrolledRecently = true;
  // const { scrolledRecently } = useScrollStopwatch({ seconds: 2 });

  function handleScroll(e) {
    const target = e.target.scrollingElement;
    const offset = target.scrollHeight - target.scrollTop;
    const bottom = offset - target.clientHeight < 100;

    if (bottom) {
      loadMore();
    }
  }

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  createEffect(() => {
    if (!loading() && !scrolledRecently) {
      scroll();
    }
  });

  return (
    <MenuBarContainer>
      <ScrollTargetComponent />
      <For each={news()}>
        {(newsItem) => <NewsCard news={newsItem} sx={{ mb: 1 }} />}
      </For>
      <LinearProgress sx={{ visibility: loading() ? "visible" : "hidden" }} />
    </MenuBarContainer>
  );
};

export default Home;
