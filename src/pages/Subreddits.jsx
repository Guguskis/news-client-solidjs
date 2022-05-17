import MenuBarContainer from "../components/MenuBarContainer";
import { useNews } from "../hooks/useNews";

export function Subreddits() {
  const [news] = useNews();

  return <MenuBarContainer>
      TOTAL NEWS LOADED {news().length}
      <br/>
      TODO ADD SETTINGS
  </MenuBarContainer>;
}
