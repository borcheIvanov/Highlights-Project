import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from 'src/app/models/video.interface';
import { YouTubeData } from '../../models/youtube-data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  imports: [
    CommonModule
  ]
})
export class PlaylistComponent  {
  @Input() videos: YouTubeData[];
  @Output() videoPlaying = new EventEmitter<Video>();

  title = 'NBA Where amazing happens';
  description = 'Choose a video from the highlight playlist to start watching';

  videoIndex = -1;

  constructor() {}

  playNext() {
    this.videoIndex++;
    const nextVideoIndex = this.videoIndex;
    const nextVideo = this.videos[nextVideoIndex];
    this.playVideo(nextVideo.id.videoId, nextVideo.snippet.title, nextVideo.snippet.description, nextVideoIndex);
  }

  playPrevious() {
    this.videoIndex--;
    const previousVideoIndex = this.videoIndex;
    const previousVideo = this.videos[previousVideoIndex];
    this.playVideo(
      previousVideo.id.videoId,
      previousVideo.snippet.title,
      previousVideo.snippet.description,
      previousVideoIndex
    );
  }

  playVideo(videoId: number, title: string, desc: string, i: number) {
    this.title = title;
    this.description = desc;
    this.videoIndex = i;

    this.videoPlaying.emit({
      id: videoId,
      url: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1',
      title: title,
      description: desc,
      index: i
    } as Video);
  }
}
