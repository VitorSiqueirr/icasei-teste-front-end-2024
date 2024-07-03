import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";

const App = () => {
  const appElement = document.createElement("div");
  appElement.classList.add("mf-videos");

  const searchBar = new SearchBar();
  appElement.appendChild(searchBar.getElement());

  const videoList = new VideoList();
  appElement.appendChild(videoList.getElement());

  return appElement;
};

export default App;
