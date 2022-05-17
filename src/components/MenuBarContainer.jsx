import Container from "@suid/material/Container";
import MenuBar from "./MenuBar.jsx";

function MenuBarContainer(params) {
  return (
    <Container sx={{ pt: 0 }}>
      <MenuBar />
      {params.children}
    </Container>
  );
}

export default MenuBarContainer;
