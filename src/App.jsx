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

function App() {
  return (
    <Providers>
      <MenuBar hideOnScroll={true} />
      <ErrorBoundary
        fallback={
          <Suspense fallback={<CenteredCircularProgress />}>
            <Error />
          </Suspense>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<CenteredCircularProgress />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/subreddits"
            element={
              <Suspense fallback={<CenteredCircularProgress />}>
                <Subreddits />
              </Suspense>
            }
          />
          <Route
            path="/dataset"
            element={
              <Suspense fallback={<CenteredCircularProgress />}>
                <Dataset />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<CenteredCircularProgress />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
