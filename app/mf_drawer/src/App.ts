import Drawer from "./components/Drawer";
import "./styles/Drawer.css";

const App = () => {
  const appElement = document.createElement("div");
  appElement.classList.add("app");

  // Crie uma instância do Drawer
  const drawer = new Drawer();
  const drawerElement = drawer.getElement();

  // Crie o elemento de conteúdo
  const contentElement = document.createElement("div");
  contentElement.id = "content";

  // Adicione o Drawer e o conteúdo à aplicação
  appElement.appendChild(drawerElement);
  appElement.appendChild(contentElement);

  return appElement;
};

export default App;
