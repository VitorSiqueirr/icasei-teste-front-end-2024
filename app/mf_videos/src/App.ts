import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import Modal from "./components/Modal";

const App = () => {
  const appElement = document.createElement("div");
  appElement.classList.add("content");
  const modal = new Modal();
  const videoList = new VideoList(modal);
  const searchBar = new SearchBar(videoList);

  document.body.appendChild(modal.getElement());
  appElement.appendChild(searchBar.getElement());
  appElement.appendChild(videoList.getElement());

  return appElement;
};

export default App;
