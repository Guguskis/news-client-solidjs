import { createTheme, ThemeProvider } from "@suid/material/styles";
import MainPage from "./pages/MainPage.jsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import CssBaseline from "@suid/material/CssBaseline";
import { NewsProvider } from "./hooks/useNewsClient.jsx";

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
      <NewsProvider
        news={[
          {
            id: 75660,
            title:
              "new to Crypto and looking for beginner eduction from a transparent and honest source(s)",
            url: "https://old.reddit.com/r/CryptoCurrency/comments/uruyg1/new_to_crypto_and_looking_for_beginner_eduction/",
            created: "2022-05-17T20:01:21Z",
            subChannel: "cryptocurrency",
            channel: "REDDIT",
          },
          {
            id: 75659,
            title:
              "Apache guncamera video shows the use and spread (rounds visible as they travel to imapct) of the AH-64D weapons systems as they destroy enemy logistics. (Iraq, Date Unknown)",
            url: "https://old.reddit.com/r/CombatFootage/comments/uruw6h/apache_guncamera_video_shows_the_use_and_spread/",
            created: "2022-05-17T19:58:52Z",
            subChannel: "combatfootage",
            channel: "REDDIT",
          },
        ]}
      >
        <ThemeProvider theme={theme}>
          {/* NewsProvider */}
          {/* StoreProvider */}

          {/* <StompSessionProvider
        url={"ws://86.100.240.140:9081/news/websocket"}
        debug={(str) => {
          console.debug("NEWS: " + str);
        }}
      > */}
          {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
          <MainPage />
          {/* <ToastContainer /> */}
          <CssBaseline />
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
