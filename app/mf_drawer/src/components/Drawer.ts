class Drawer {
  private drawerElement: HTMLDivElement;

  constructor() {
    this.drawerElement = document.createElement("div");
    this.drawerElement.classList.add("drawer");
    this.render();
  }

  private render(): void {
    this.drawerElement.innerHTML = `
      <ul>
        <li><a href="#" data-route="videos">Vídeos</a></li>
        <li><a href="#" data-route="favoritos">Favoritos</a></li>
      </ul>
    `;

    // Adicione event listeners aos links
    const links = this.drawerElement.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const route = (event.target as HTMLElement).dataset.route;
        if (route) {
          this.handleNavigation(route);
        }
      });
    });
  }

  private handleNavigation(route: string): void {
    // Remova o conteúdo antigo do container.
    const contentContainer = document.getElementById("content");
    contentContainer!.innerHTML = ""; // Limpa o conteúdo

    // Carregue o script do mf_videos dinamicamente.
    const script = document.createElement("script");
    script.src = `http://localhost:8081/mf_videos.js?route=${route}`;
    document.head.appendChild(script);
  }

  public getElement(): HTMLDivElement {
    return this.drawerElement;
  }
}

export default Drawer;
