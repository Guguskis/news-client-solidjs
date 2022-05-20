import CssBaseline from "@suid/material/CssBaseline";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Route, Routes } from "solid-app-router";
import { NewsProvider } from "./hooks/useNews.jsx";
import Home from "./pages/Home.jsx";
import { Subreddits } from "./pages/Subreddits.jsx";

TimeAgo.addDefaultLocale(en);

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#90caf9",
    },
    text: {
      primary: "#90caf9",
      secondary: "#6098c6",
      disabled: "#6098c6",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      main: "#424242",
      default: "#212121",
      paper: "#424242",
    },
  },
});

// toast.configure({
//   position: "top-right",
//   autoClose: 5000,
// });

function App() {
  return (
    <>
      <NewsProvider>
        <ThemeProvider theme={theme}>
          {/* StoreProvider */}

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
