import ChevronLeftIcon from "@suid/icons-material/ChevronLeft";
import ChevronRightIcon from "@suid/icons-material/ChevronRight";
import DynamicFeedIcon from "@suid/icons-material/DynamicFeed";
import FilterListIcon from "@suid/icons-material/FilterList";
import MenuIcon from "@suid/icons-material/Menu";
import IconButton from "@suid/material/IconButton";
import Drawer from "@suid/material/Drawer";
import AppBar from "@suid/material/AppBar";
import Divider from "@suid/material/Divider";
import Container from "@suid/material/Container";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemText from "@suid/material/ListItemText";
import styled from "@suid/system/styled";
import Toolbar from "@suid/material/Toolbar";
import ListItemIcon from "@suid/material/ListItemIcon";
import Slide from "@suid/material/Slide";
import { useTheme } from "@suid/material/styles";
import { createEffect, createSignal, mergeProps, onCleanup } from "solid-js";
import { useNavigate } from "solid-app-router";
import useScrollTrigger from "../hooks/useScrollTrigger";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function HideOnScroll(props) {
  const [direction] = useScrollTrigger();
  const [trigger, setTrigger] = createSignal(false);

  createEffect(() => {
    if (direction()) {
      setTrigger(trigger => !trigger);
    }
  });

  return (
    <Slide appear={false} direction="down" in={!trigger()}>
      {props.children}
    </Slide>
  );
}

function MenuBar(props) {
  const [open, setOpen] = createSignal(false);
  const navigate = useNavigate();

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

  return (
    <Container maxWidth="false" sx={{ mb: 10 }}>
      <HideOnScroll {...props}>
        <AppBar position="fixed" color="text" open={open()} sx={{ mb: 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={mergeProps({ mr: 2 }, () => open() && { display: "none" })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open()}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon color="primary" />
            ) : (
              <ChevronRightIcon color="primary" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={navigateHome}>
            <ListItemIcon>
              <DynamicFeedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Feed" />
          </ListItem>
          <ListItem button onClick={navigateSubreddits}>
            <ListItemIcon>
              <FilterListIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Subreddits" />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );

  function navigateHome() {
    navigate("/");
  }

  function navigateSubreddits() {
    navigate("/subreddits");
  }
}

export default MenuBar;
