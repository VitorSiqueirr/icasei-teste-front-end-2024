import { Video } from "../interface/VideoInterface";
import Modal from "./Modal";
import "../styles/VideoItem.css";

class VideoItem {
  private element: HTMLDivElement;
  private modal: Modal;

  constructor(private video: Video, modal: Modal) {
    // 'video' será o objeto com dados do vídeo
    this.element = document.createElement("div");
    this.element.classList.add("video-item");
    this.modal = modal;
    this.render(video);
  }

  private render(video: Video): void {
    this.element.innerHTML = `
      <div class="video-item-content"> 
      <div class="thumbnail-container">
        <img class="video-thumbnail" src="${video.thumbnail_url}" alt="${video.title}">
        <button class="play-button" data-video-id="${video.id}">
          <svg class="play-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"/></svg>
        </div>
        <div class="favorite-button">
          <svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        </div>
      </div>
    `;

    const playButton = this.element.querySelector(".play-button");
    playButton!.addEventListener("click", () => this.handlePlay(video.id));
  }

  private handlePlay(videoId: string): void {
    this.modal.show(videoId);
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }
}

export default VideoItem;
