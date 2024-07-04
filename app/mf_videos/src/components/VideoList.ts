import { Video } from "../interface/VideoInterface";
import Modal from "./Modal";
import VideoItem from "./VideoItem";
import "../styles/Videos.css";

class VideoList {
  private element: HTMLDivElement;
  private videos: Video[] = [];
  private modal: Modal;

  constructor(modal: Modal) {
    this.modal = modal;
    this.element = document.createElement("div");
    this.element.classList.add("video-list");
  }

  public async searchVideos(query: string): Promise<void> {
    try {
      // const response = await fetch(`http://localhost:8080/videos?q=${query}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error(
      //     `Erro na busca: ${response.status} ${response.statusText}`
      //   );
      // }

      // const data = await response.json();
      this.videos = exampleVideos;
      this.render();
    } catch (error) {}
  }

  private render(): void {
    this.element.innerHTML = "";

    if (this.videos.length === 0) {
      this.element.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
      return;
    }

    // Crie os VideoItems com a estrutura correta
    this.videos.forEach((video: Video) => {
      // Adicione a tipagem aqui
      const videoItem = new VideoItem(video, this.modal);
      this.element.appendChild(videoItem.getElement());
    });
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}

export default VideoList;

const exampleVideos: Video[] = [
  {
    id: "VIDEO_ID_1",
    thumbnail_url: "https://i.ytimg.com/vi/VIDEO_ID_1/default.jpg",
    title: "Exemplo de Vídeo 1",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_1",
  },
  {
    id: "VIDEO_ID_2",
    thumbnail_url: "https://i.ytimg.com/vi/VIDEO_ID_2/default.jpg",
    title: "Exemplo de Vídeo 2",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_2",
  },
  {
    id: "VIDEO_ID_3",
    thumbnail_url: "https://i.ytimg.com/vi/VIDEO_ID_3/default.jpg",
    title: "Exemplo de Vídeo 3",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_3",
  },
  {
    id: "VIDEO_ID_4",
    thumbnail_url: "https://i.ytimg.com/vi/VIDEO_ID_4/default.jpg",
    title: "Exemplo de Vídeo 4",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_4",
  },
];
