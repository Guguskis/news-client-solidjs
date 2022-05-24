import Grid from "@suid/material/Grid";
import Typography from "@suid/material/Typography";

function NotFound() {
  return (
    <Grid container justify="flex-end">
      <Typography variant="h4" sx={{ margin: "auto" }}>
        Whoops... page not found 😥
      </Typography>
    </Grid>
  );
}

export default NotFound;
