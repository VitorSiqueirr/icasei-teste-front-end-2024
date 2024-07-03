import App from "./App";
import "./styles/Index.css";

console.log("chegou drawer");
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("mf_drawer");
  if (root) {
    const indexElement = App();
    root.appendChild(indexElement);
  } else {
    console.error("Elemento root não encontrado!");
  }
});
