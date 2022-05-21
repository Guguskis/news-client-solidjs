import LinearProgress from "@suid/material/LinearProgress";
import { createEffect, createSignal, For, onCleanup } from "solid-js";
import MenuBarContainer from "../components/MenuBarContainer.jsx";
import NewsCard from "../components/NewsCard.jsx";
import { useNews } from "../hooks/useNews.jsx";
import useScrollableTarget from "../hooks/useScrollableTarget.jsx";

const Home = () => {
  const { news, loading, loadMore } = useNews();

  const [scroll, ScrollTarget] = useScrollableTarget();
  const [scrolledRecently] = createSignal(false);
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
    const callback = window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", callback));
  });

  createEffect(() => {
    if (!loading() && scrolledRecently()) {
      // if (!loading() && untrack(() => !scrolledRecently())) {
      scroll();
    }
  });

  return (
    <MenuBarContainer onScrollHideMenuBar={true}>
      <ScrollTarget />
      <For each={news()}>
        {(newsItem) => <NewsCard news={newsItem} sx={{ mb: 1 }} />}
      </For>
      <LinearProgress sx={{ visibility: loading() ? "visible" : "hidden" }} />
    </MenuBarContainer>
  );
};

export default Home;
