import Grid from "@suid/material/Grid";
import Typography from "@suid/material/Typography";
import MenuBarContainer from "../components/MenuBarContainer";

function NotFound() {
  return (
    <MenuBarContainer onScrollHideMenuBar={false}>
      <Grid container justify="flex-end">
        <Typography variant="h4" sx={{ margin: "auto" }}>
          Whoops... page not found 😥
        </Typography>
      </Grid>
    </MenuBarContainer>
  );
}

export default NotFound;
