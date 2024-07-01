class Drawer {
  private container: HTMLElement;
  private links: { text: string; href: string }[];

  constructor(containerId: string, links: { text: string; href: string }[]) {
    this.container = document.getElementById(containerId)!;
    this.links = links;

    this.render();
  }

  private render(): void {
    const ul = document.createElement("ul");
    this.links.forEach((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      ul.appendChild(li);
    });

    this.container.innerHTML = ""; // Limpa o container antes de renderizar
    this.container.appendChild(ul);
  }
}

export default Drawer;
