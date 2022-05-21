import AddCircleIcon from "@suid/icons-material/AddCircle";
import DeleteIcon from "@suid/icons-material/Delete";
import Grid from "@suid/material/Grid";
import IconButton from "@suid/material/IconButton";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemText from "@suid/material/ListItemText";
import TextField from "@suid/material/TextField";
import { createSignal } from "solid-js";
import MenuBarContainer from "../components/MenuBarContainer";
import { useNews } from "../hooks/useNews";

export default function Subreddits() {
  const { subscribeReddit, unsubscribeReddit, subreddits } = useNews();

  const [subredditInput, setSubredditInput] = createSignal("");
  const [subredditError, setSubredditError] = createSignal(null);

  function handleSubredditInputChange(e) {
    setSubredditInput(e.target.value);
  }

  function handleSubredditSubmit() {
    if (subredditInput().length === 0) {
      setSubredditError("Subreddit name cannot be empty");
      return;
    }

    if (containsIgnoreCase(subreddits(), subredditInput())) {
      setSubredditError("Subreddit already subscribed");
      return;
    }

    subscribeReddit([subredditInput()]);

    setSubredditError(null);
    setSubredditInput("");
  }

  function handleSubredditInputKeyDown(e) {
    if (e.key === "Enter") {
      handleSubredditSubmit();
    }
  }

  function handleSubredditRemove(subreddit) {
    unsubscribeReddit([subreddit]);
  }

  return (
    <MenuBarContainer>
      <Grid item xs={12} md={6}>
        <TextField
          sx={{ mb: 1 }}
          variant="outlined"
          label="Subreddit"
          value={subredditInput()}
          onChange={handleSubredditInputChange}
          onKeyDown={handleSubredditInputKeyDown}
          error={subredditError() !== null}
          helperText={subredditError()}
        />

        <IconButton
          color="primary"
          onClick={handleSubredditSubmit}
          sx={{ mt: 1 }}
        >
          <AddCircleIcon />
        </IconButton>

        <List dense={true}>
          {subreddits().map((subreddit) => (
            <ListItem key={subreddit}>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleSubredditRemove(subreddit)}
                sx={{ mr: 1 }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
              <ListItemText primary={"r/" + subreddit} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </MenuBarContainer>
  );
}

function containsIgnoreCase(items, item) {
  return items.some((i) => i.toLowerCase() === item.toLowerCase());
}
