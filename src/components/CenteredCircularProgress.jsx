import CircularProgress from "@suid/material/CircularProgress";
import Grid from "@suid/material/Grid";

export default function CenteredCircularProgress() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ height: "100vh" }}
    >
      <Grid item sx={{ margin: "auto" }}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}