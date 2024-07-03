import VideoItem from "./VideoItem";

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

class VideoList {
  private element: HTMLDivElement;
  private videos: Video[] = [];

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("video-list");
  }

  public async searchVideos(query: string): Promise<void> {
    try {
      const response = await fetch(`http://localhost:4567/videos?q=${query}`);

      if (!response.ok) {
        throw new Error(
          `Erro na busca: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      this.videos = data;
      this.render();
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  }

  private render(): void {
    this.element.innerHTML = ""; // Limpa a lista antes de renderizar

    if (this.videos.length === 0) {
      // Exibe mensagem se não houver vídeos
      this.element.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
      return;
    }

    // Cria os VideoItems e adiciona à lista
    this.videos.forEach((video) => {
      const videoItem = new VideoItem(video);
      this.element.appendChild(videoItem.getElement());
    });
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}

export default VideoList;
