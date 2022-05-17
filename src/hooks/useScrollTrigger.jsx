import { createEffect, createSignal } from "solid-js";

function useScrollTrigger() {
  const [direction, setDirection] = createSignal();
  const [position, setPosition] = createSignal(0);

  createEffect(() => {
    window.addEventListener("scroll", handleScrollDocument);
    return () => window.removeEventListener("scroll", handleScrollDocument);
  });

  function handleScrollDocument() {
    const bounds = document.body.getBoundingClientRect();
    setDirection(bounds.top > position() ? "up" : "down");
    setPosition(bounds.top);
  }

  return [direction, position];
}

export default useScrollTrigger;
