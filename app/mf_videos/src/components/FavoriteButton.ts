class FavoriteButton extends HTMLElement {
  private videoId: string = "";
  private isFavorite: boolean = false; // Estado inicial

  constructor() {
    super(); // Chame o construtor da superclasse (HTMLElement)
    this.classList.add("favorite-button");

    // Obter o ID do vídeo do atributo do elemento personalizado
    this.videoId = this.getAttribute("video-id") || "";

    this.addEventListener("click", () => {
      this.toggleFavorite();
    });
  }

  private render(): void {
    this.textContent = this.isFavorite ? "Desfavoritar" : "Favoritar";
  }

  // connectedCallback é chamado quando o elemento é inserido no DOM
  connectedCallback() {
    this.render();
  }

  private async toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.render();

    try {
      const method = this.isFavorite ? "POST" : "DELETE";
      const response = await fetch(
        `http://localhost:4567/favorites?video_id=${this.videoId}`,
        {
          method: method,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao favoritar/desfavoritar: ${response.status} ${response.statusText}`
        );
      }

      console.log(
        `Vídeo ${this.videoId} ${
          this.isFavorite ? "adicionado aos" : "removido dos"
        } favoritos!`
      );
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar vídeo:", error);
      this.isFavorite = !this.isFavorite;
      this.render();
    }
  }
}

customElements.define("favorite-button", FavoriteButton);
