import logo from "./logo.svg";
import styles from "./App.module.css";
import { createSignal, createEffect, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

function createLocalStore(initState) {
  const [state, setState] = createStore(initState);
  if (localStorage.todos) setState(JSON.parse(localStorage.todos));
  createEffect(() => (localStorage.todos = JSON.stringify(state)));
  return [state, setState];
}

function App() {
  const [store, setStore] = createLocalStore({
    counter: 0,
    users: ["Sally", "Matt"],
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Counter {store.counter}
        </a>
        <button onClick={() => setStore({ counter: store.counter + 1 })}>
          +
        </button>
      </header>
    </div>
  );
}

export default App;
