import { createEffect, createSignal, onCleanup } from "solid-js";

export function useScrollTrigger() {
  const [direction, setDirection] = createSignal();
  const [position, setPosition] = createSignal(0);

  createEffect(() => {
    const callback = window.addEventListener("scroll", handleScrollDocument);
    onCleanup(() => window.removeEventListener("scroll", callback));
  });

  function handleScrollDocument() {
    const bounds = document.body.getBoundingClientRect();
    setDirection(bounds.top > position() ? "up" : "down");
    setPosition(bounds.top);
  }

  return [direction, position];
}