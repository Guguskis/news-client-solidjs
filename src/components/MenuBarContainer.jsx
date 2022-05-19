import Container from "@suid/material/Container";
import MenuBar from "./MenuBar.jsx";

function MenuBarContainer(props) {
  return (
    <Container sx={{ pt: 0 }}>
      <MenuBar hideOnScroll={props.onScrollHideMenuBar}/>
      {props.children}
    </Container>
  );
}

export default MenuBarContainer;
