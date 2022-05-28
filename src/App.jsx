import { Route, Routes } from "solid-app-router";
import { ErrorBoundary, lazy, Suspense } from "solid-js";
import CenteredCircularProgress from "./components/CenteredCircularProgress.jsx";
import Providers from "./config/providers.jsx";
import Dataset from "./pages/Dataset.jsx";
import Error from "./pages/Error.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Subreddits = lazy(() => import("./pages/Subreddits.jsx"));
const MenuBar = lazy(() => import("./components/MenuBar.jsx"));

function SuspendedPage({ page }) {
  return <Suspense fallback={<CenteredCircularProgress />}>{page}</Suspense>;
}

function App() {
  return (
    <Providers>
      <MenuBar hideOnScroll={true} />
      <ErrorBoundary fallback={<SuspendedPage page={<Error />} />}>
        <Routes>
          <Route path="/" element={<SuspendedPage page={<Home />} />} />
          <Route
            path="/subreddits"
            element={<SuspendedPage page={<Subreddits />} />}
          />
          <Route
            path="/dataset"
            element={<SuspendedPage page={<Dataset />} />}
          />
          <Route path="*" element={<SuspendedPage page={<NotFound />} />} />
        </Routes>
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
