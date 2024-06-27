import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Video } from '../../models/video.interface';
import { VideosService } from '../../services/videos.service';
import { YouTubeData } from '../../models/youtube-data.interface';
import { PlayerComponent, PlaylistComponent } from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    PlayerComponent,
    PlaylistComponent
  ],
  providers: [
    VideosService
  ]
})
export class HomeComponent implements OnInit {

  videos: YouTubeData[] = [];

  currentVideo: Video;

  constructor(private _videos: VideosService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getVideos();
  }

  filterVideos() {
    const filteredVideos = [];
    this.videos.forEach(video => {
      if (video.snippet.title.indexOf('Quarter') === -1) {
        filteredVideos.push(video);
      }
    });

    this.videos = filteredVideos;
    this.cdr.markForCheck();
  }

  getVideos() {
    this._videos.getVideos().subscribe(
      res => {
        this.videos = res.items;
        this.filterVideos();
      },
      err => console.log(err)
    );
  }

  playVideo(video: Video) {
    this.currentVideo = video;
  }

}
