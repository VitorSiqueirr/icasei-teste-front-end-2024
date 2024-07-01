import Drawer from "components/Drawer";

const links = [
  { text: "Vídeos", href: "/videos" },
  { text: "Favoritos", href: "/favorites" },
];

new Drawer("mf-drawer-container", links);
