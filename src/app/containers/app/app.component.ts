import { Component, OnInit } from '@angular/core';
import { VideosService } from '../../services/videos.service';
import { Video } from '../../models/video.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentYear: number;
  videos: any = [];

  currentVideo: Video;

  constructor(private _videos: VideosService) {}

  ngOnInit() {
    this.getVideos();
    this.getCurrentYear();
  }

  getCurrentYear(): void {
    const year: number = new Date().getFullYear();
    this.currentYear = year;
  }

  filterVideos() {
    const filteredVideos = [];
    this.videos.forEach(video => {
      if (video.snippet.title.indexOf('Quarter') === -1) {
        filteredVideos.push(video);
      }
    });

    this.videos = filteredVideos;
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
