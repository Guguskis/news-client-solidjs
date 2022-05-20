import { createTheme } from "@suid/material";

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

export default theme;