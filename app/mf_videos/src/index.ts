import App from "./App";
import Modal from "./components/Modal";
import "./styles/Index.css";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("mf_videos");
  if (root) {
    const indexElement = App();
    root.appendChild(indexElement);
  } else {
    console.error("Elemento mf_videos não encontrado!");
  }
});

export function onYouTubeIframeAPIReady(modal: Modal, videoId: string) {
  modal.initializePlayer(videoId);
}
