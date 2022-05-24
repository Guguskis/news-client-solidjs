import CssBaseline from "@suid/material/CssBaseline";
import { ThemeProvider } from "@suid/material/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Route, Routes } from "solid-app-router";
import { lazy, Suspense } from "solid-js";
import CenteredCircularProgress from "./components/CenteredCircularProgress.jsx";
import theme from "./config/theme.jsx";
import { NewsProvider } from "./hooks/useNews.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Subreddits = lazy(() => import("./pages/Subreddits.jsx"));
const MenuBar = lazy(() => import("./components/MenuBar.jsx"));

TimeAgo.addDefaultLocale(en);

// toast.configure({
//   position: "top-right",
//   autoClose: 5000,
// });

function App() {
  return (
    <>
      <NewsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MenuBar hideOnScroll={true} />
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
              path="*"
              element={
                <Suspense fallback={<CenteredCircularProgress />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
          {/* <ToastContainer /> */}
        </ThemeProvider>
      </NewsProvider>
    </>
  );
}

export default App;
