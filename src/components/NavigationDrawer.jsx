import ChevronLeftIcon from "@suid/icons-material/ChevronLeft";
import ChevronRightIcon from "@suid/icons-material/ChevronRight";
import DynamicFeedIcon from "@suid/icons-material/DynamicFeed";
import FilterListIcon from "@suid/icons-material/FilterList";
import ScienceIcon from '@suid/icons-material/Science';
import Divider from "@suid/material/Divider";
import Drawer from "@suid/material/Drawer";
import IconButton from "@suid/material/IconButton";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemIcon from "@suid/material/ListItemIcon";
import ListItemText from "@suid/material/ListItemText";
import ListSubheader from "@suid/material/ListSubheader";
import { useTheme } from "@suid/material/styles";
import styled from "@suid/system/styled";
import { useNavigate } from "solid-app-router";

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

export default function NavigationDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const theme = useTheme();

  function handleDrawerClose() {
    onClose();
  }

  function navigateHome() {
    handleDrawerClose();
    navigate("/");
  }

  function navigateSubreddits() {
    handleDrawerClose();
    navigate("/subreddits");
  }

  function navigateDataset() {
    handleDrawerClose();
    navigate("/dataset");
  }

  return (
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
      <List subheader={<ListSubheader component="div">News</ListSubheader>}>
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
      <Divider />
      <List subheader={<ListSubheader component="div">AI</ListSubheader>}>
        <ListItem button onClick={navigateDataset}>
          <ListItemIcon>
            <ScienceIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dataset" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
}
