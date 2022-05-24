import ChevronLeftIcon from "@suid/icons-material/ChevronLeft";
import ChevronRightIcon from "@suid/icons-material/ChevronRight";
import DynamicFeedIcon from "@suid/icons-material/DynamicFeed";
import FilterListIcon from "@suid/icons-material/FilterList";
import MenuIcon from "@suid/icons-material/Menu";
import AppBar from "@suid/material/AppBar";
import Container from "@suid/material/Container";
import Divider from "@suid/material/Divider";
import Drawer from "@suid/material/Drawer";
import IconButton from "@suid/material/IconButton";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemIcon from "@suid/material/ListItemIcon";
import ListItemText from "@suid/material/ListItemText";
import Slide from "@suid/material/Slide";
import { useTheme } from "@suid/material/styles";
import Toolbar from "@suid/material/Toolbar";
import styled from "@suid/system/styled";
import { useNavigate } from "solid-app-router";
import { createEffect, createSignal, mergeProps } from "solid-js";
import { useScrollTrigger } from "../hooks/useScrollTrigger";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
  },
}));

function HideOnScroll({ enabled, children }) {
  const [direction] = useScrollTrigger();
  const [visible, setVisible] = createSignal(true);

  createEffect(() => {
    if (direction() === "down") {
      setVisible(false);
    } else if (direction() === "up") {
      setVisible(true);
    }
  });

  return enabled ? (
    <Slide appear={false} direction="down" in={visible()}>
      {children}
    </Slide>
  ) : (
    children
  );
}

function MenuBar({ hideOnScroll }) {
  const [open, setOpen] = createSignal(false);
  const navigate = useNavigate();
  const theme = useTheme();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function navigateHome() {
    setOpen(false);
    navigate("/");
  }

  function navigateSubreddits() {
    setOpen(false);
    navigate("/subreddits");
  }

  return (
    <Container maxWidth="false" sx={{ pb: 10 }}>
      <HideOnScroll enabled={hideOnScroll}>
        <AppBar position="fixed" color="background" open={open()}>
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
      <StyledDrawer variant="persistent" anchor="left" open={open()}>
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
      </StyledDrawer>
    </Container>
  );
}

export default MenuBar;
