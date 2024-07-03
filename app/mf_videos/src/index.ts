import App from "./App";
import "./styles/Index.css";

console.log("chegou Videos");
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("mf_videos");
  if (root) {
    const indexElement = App();
    root.appendChild(indexElement);
  } else {
    console.error("Elemento root não encontrado!");
  }
});
