class VideoItem {
  private element: HTMLDivElement;

  constructor(video: any) {
    // 'video' será o objeto com dados do vídeo
    this.element = document.createElement("div");
    this.element.classList.add("video-item");
    this.render(video);
  }

  private render(video: any): void {
    // Lógica para gerar o HTML do VideoItem (miniatura, título, etc.)
    // usando os dados do objeto 'video'.

    // Exemplo:
    this.element.innerHTML = `
      <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
      <h3>${video.snippet.title}</h3>
      <button class="play-button">Play</button>
      <favorite-button video-id="${video.id.videoId}"></favorite-button> 
    `;
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}

export default VideoItem;
