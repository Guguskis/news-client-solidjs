import DefaultTimeAgo from "javascript-time-ago";
import { createSignal, onCleanup } from "solid-js";
import { createAnimationLoop } from "./util";

function createTimeAgo({ date }) {
  const timeAgo = new DefaultTimeAgo();
  
  const [message, setMessage] = createSignal(formatMessage());
  const dispose = createAnimationLoop(() => setMessage(formatMessage()));
  onCleanup(dispose);

  return message;

  function formatMessage() {
    return timeAgo.format(Date.parse(date));
  }
}

export default createTimeAgo;
