import VideoList from "./VideoList";

class SearchBar {
  private element: HTMLDivElement;
  private videoList: VideoList;

  constructor(videoList: VideoList) {
    this.videoList = videoList;
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

  private async handleSearch() {
    const searchInput = this.element.querySelector(
      "input"
    )! as HTMLInputElement;
    const searchTerm = searchInput.value;

    await this.videoList.searchVideos(searchTerm);
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}

export default SearchBar;
