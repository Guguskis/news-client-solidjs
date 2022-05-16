import { createTheme, ThemeProvider } from "@suid/material/styles";
import MainPage from "./pages/MainPage.jsx";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

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
    <ThemeProvider theme={theme}>
      {/* <StompSessionProvider
        url={"ws://86.100.240.140:9081/news/websocket"}
        debug={(str) => {
          console.debug("NEWS: " + str);
        }}
      > */}
      {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
        <MainPage/>
        {/* <ToastContainer /> */}
        {/* <CssBaseline /> */}
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
  );
}

export default App;
