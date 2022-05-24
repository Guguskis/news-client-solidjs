import CssBaseline from "@suid/material/CssBaseline";
import { ThemeProvider } from "@suid/material/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Route, Routes } from "solid-app-router";
import { lazy } from "solid-js";
import theme from "./config/theme.jsx";
import { NewsProvider } from "./hooks/useNews.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Subreddits = lazy(() => import("./pages/Subreddits.jsx"));

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subreddits" element={<Subreddits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <ToastContainer /> */}
        </ThemeProvider>
      </NewsProvider>
    </>
  );
}

export default App;
