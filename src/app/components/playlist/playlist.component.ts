import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from 'src/app/models/video.interface';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @Input() videos: any;
  @Output() videoPlaying = new EventEmitter<Video>();

  title = 'NBA Where amazing happens';
  description = 'Choose a video from the highlight playlist to start watching';

  videoIndex = -1;

  constructor() {}

  ngOnInit() {}

  playNext() {
    const nextVideoIndex = this.videoIndex + 1;
    const nextVideo = this.videos[nextVideoIndex];
    this.playVideo(
      nextVideo.id.videoId,
      nextVideo.snippet.title,
      nextVideo.snippet.description,
      nextVideoIndex
    );
  }

  playPrevious() {
    const previousVideoIndex = this.videoIndex - 1;
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

    this.videoPlaying.emit({
      id: videoId,
      url: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1',
      title: title,
      description: desc,
      index: i
    } as Video);
  }
}
