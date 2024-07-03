import VideoList from "./VideoList";

class SearchBar {
  private element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("search-bar");
    this.render();
  }

  private render(): void {
    this.element.innerHTML = `
      <input type="text" placeholder="Pesquisar...">
      <button class="search-button">Buscar</button>
    `;

    // Adicione um event listener para o botão de busca
    const searchButton = this.element.querySelector(".search-button")!;
    searchButton.addEventListener("click", () => {
      this.handleSearch();
    });
  }

  private handleSearch(): void {
    const searchInput = this.element.querySelector(
      "input"
    )! as HTMLInputElement;
    const searchTerm = searchInput.value;

    // Implemente a lógica para buscar vídeos na API
    // e atualizar a lista de vídeos com base no 'searchTerm'
    console.log("Buscando por:", searchTerm);
    const videoList = new VideoList(); // Crie uma instância do VideoList (ajuste se necessário)
    videoList.searchVideos(searchTerm);
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}

export default SearchBar;
