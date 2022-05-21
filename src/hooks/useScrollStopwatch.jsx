import { createEffect, createSignal, onCleanup, untrack } from "solid-js";

function useScrollStopwatch({ seconds }) {
  const [scrolledRecently, setScrolledRecently] = createSignal(false);
  const [timeoutCallback, setTimeoutCallback] = createSignal(null);

  createEffect(() => {
    const callback = window.addEventListener("scroll", onScroll);
    onCleanup(() => window.removeEventListener("scroll", callback));
  });

  function onScroll() {
    setScrolledRecently(true);
    resetTimeout();
  }

  function resetTimeout() {
    untrack(() => clearTimeout(timeoutCallback()));

    const callback = setTimeout(() => {
      setScrolledRecently(false);
    }, seconds * 1000);

    setTimeoutCallback(callback);
  }

  createEffect(() => {
    if (!scrolledRecently()) {
      console.log("not scrolled recently");
    } else {
      console.log("scrolled recently");
    }
  });

  return { scrolledRecently };
}

export default useScrollStopwatch;
