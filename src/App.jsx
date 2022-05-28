import CircularProgress from "@suid/material/CircularProgress";
import { Route, Routes } from "solid-app-router";
import { ErrorBoundary, lazy, Suspense } from "solid-js";
import CenteredCircularProgress from "./components/CenteredCircularProgress";
import Providers from "./config/providers.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Subreddits = lazy(() => import("./pages/Subreddits.jsx"));
const Dataset = lazy(() => import("./pages/Dataset.jsx"));
const MenuBar = lazy(() => import("./components/MenuBar.jsx"));

function SuspendedPage({ page }) {
  return <Suspense fallback={<CircularProgress />}>{page}</Suspense>;
}

function App() {

  const ErrorPage = () => (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Error />
    </Suspense>
  );
  const HomePage = () => (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Home />
    </Suspense>
  );
  const SubredditsPage = () => (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Subreddits />
    </Suspense>
  );
  const DatasetPage = () => (
    <Suspense fallback={<CenteredCircularProgress />}>
      <Dataset />
    </Suspense>
  );
  const NotFoundPage = () => (
    <Suspense fallback={<CenteredCircularProgress />}>
      <NotFound />
    </Suspense>
  );


  return (
    <Providers>
      <MenuBar hideOnScroll={true} />
      <ErrorBoundary fallback={<ErrorPage/>}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/subreddits" element={<SubredditsPage />} />
          <Route
            path="/dataset"
            element={<DatasetPage/>}
          />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
