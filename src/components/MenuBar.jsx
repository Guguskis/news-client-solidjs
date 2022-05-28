import MenuIcon from "@suid/icons-material/Menu";
import AppBar from "@suid/material/AppBar";
import Container from "@suid/material/Container";
import IconButton from "@suid/material/IconButton";
import Slide from "@suid/material/Slide";
import Toolbar from "@suid/material/Toolbar";
import { createEffect, createSignal, mergeProps } from "solid-js";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import NavigationDrawer from "./NavigationDrawer.jsx";

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

function MenuBar({ hideOnScroll = true }) {
  const [open, setOpen] = createSignal(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
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
      <NavigationDrawer open={open} onClose={handleDrawerClose} />
    </Container>
  );
}

export default MenuBar;
