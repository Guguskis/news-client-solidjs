import CssBaseline from "@suid/material/CssBaseline";
import { ThemeProvider } from "@suid/material/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Route, Routes } from "solid-app-router";
import theme from "./config/theme.jsx";
import { NewsProvider } from "./hooks/useNews.jsx";
import Home from "./pages/Home.jsx";
import { Subreddits } from "./pages/Subreddits.jsx";

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

          {/* <StompSessionProvider
        url={"ws://86.100.240.140:9081/news/websocket"}
        debug={(str) => {
          console.debug("NEWS: " + str);
        }}
      > */}
          {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subreddits" element={<Subreddits />} />
          </Routes>
          {/* <ToastContainer /> */}
          {/* <Router> */}
          {/* <Switch> */}
          {/* <Route exact path="/" component={MainPage} /> */}
          {/* <Route
                exact
                path="/subscriptions"
                component={RedditSubscriptionForm}
              /> */}
          {/* <Route component={NotFoundPage}/> */}
          {/* </Switch> */}
          {/* </Router> */}
          {/* </LocalizationProvider> */}
          {/* </StompSessionProvider> */}
        </ThemeProvider>
      </NewsProvider>
    </>
  );
}

export default App;
