/// <reference types="@types/youtube" />
import { onYouTubeIframeAPIReady } from "..";
import "../styles/Modal.css";

class Modal {
  private modalElement: HTMLDivElement;
  private player: YT.Player | null = null;

  constructor() {
    this.modalElement = document.createElement("div");
    this.modalElement.id = "ytPlayerContainer";
    this.modalElement.classList.add("modal", "hidden");
    this.render();

    document.body.appendChild(this.modalElement);
  }

  private render(): void {
    this.modalElement.innerHTML = `
        <div class="modal-content">
          <span class="close-button">×</span>
          <div id="ytPlayer"></div> 
        </div>
      `;

    const closeButton = this.modalElement.querySelector(".close-button")!;
    closeButton.addEventListener("click", () => this.hide());
  }

  private onReady(event: YT.PlayerEvent): void {
    this.player = event.target;
  }

  private onPlayerStateChange(event: YT.OnStateChangeEvent): void {
    // Para a reprodução quando o modal for fechado
    if (
      this.modalElement.classList.contains("hidden") &&
      event.data === YT.PlayerState.PLAYING
    ) {
      this.player?.pauseVideo();
    }

    // Limpa o player quando o vídeo termina e o modal está fechado
    if (
      event.data === YT.PlayerState.ENDED &&
      this.modalElement.classList.contains("hidden")
    ) {
      this.player = null;
    }
  }

  public show(videoId: string): void {
    this.modalElement.classList.remove("hidden");

    // Destrói o player existente antes de criar um novo
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    onYouTubeIframeAPIReady(this, videoId);
  }

  public hide(): void {
    this.modalElement.classList.add("hidden");
    this.player?.pauseVideo();
  }

  public getElement(): HTMLDivElement {
    return this.modalElement;
  }

  public initializePlayer(videoId: string): void {
    this.player = new YT.Player("ytPlayer", {
      videoId: videoId,
      events: {
        onReady: (event) => this.onReady(event),
        onStateChange: (event) => this.onPlayerStateChange(event), // Novo listener
      },
    });
  }
}

export default Modal;
