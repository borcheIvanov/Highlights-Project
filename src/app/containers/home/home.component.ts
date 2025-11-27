import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Video } from '../../models/video.interface';
import { VideosService } from '../../services/videos.service';
import { YouTubeData } from '../../models/youtube-data.interface';
import { PlayerComponent, PlaylistComponent } from '../../components';
import { Playlist, Query } from '../../models/playlist.interface';

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
  playlists: Playlist[] = [];
  currentVideo: Video;
  selectedPlaylist: Playlist | null = null;

  constructor(private _videos: VideosService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.playlists = this._videos.getList();
    if (this.playlists && this.playlists.length) {
      this.getVideos(this.playlists[0]);
    }
  }

  filterVideos(query: Query) {
    const filteredVideos = [];

    if(query.includes.length > 0) {
      query.includes.forEach(item => {
        this.videos.forEach(video => {
          if (video.snippet.title.indexOf(item) > -1) {
            filteredVideos.push(video);
          }
        });
      });
    }

    if(query.excludes.length > 0) {
      query.excludes.forEach(item => {
        this.videos.forEach(video => {
          if (video.snippet.title.indexOf(item) === -1) {
            filteredVideos.push(video);
          }
        });
      });
    }

    this.videos = filteredVideos;
    this.cdr.markForCheck();
  }

  getVideos(playlist: Playlist) {
    this.selectedPlaylist = playlist;
    this._videos.getVideos(playlist).subscribe({
      next: (response) => {
        this.videos = response.items;
        this.filterVideos(playlist.query);
      },
      error: (err) =>  console.error('error getting videos from youtube: ' + err)
    });
  }

  playVideo(video: Video) {
    this.currentVideo = video;
  }

}
