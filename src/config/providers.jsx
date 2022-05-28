import { ThemeProvider } from "@suid/material";
import CssBaseline from "@suid/material/CssBaseline";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { NewsProvider } from "../hooks/useNews.jsx";
import theme from "./theme.jsx";


export default function Providers(props) {
  TimeAgo.addDefaultLocale(en);
  return (
    <NewsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </NewsProvider>
  );
}
