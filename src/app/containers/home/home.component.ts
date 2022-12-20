import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video.interface';
import { VideosService } from '../../services/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any = [];

  currentVideo: Video;

  constructor(private _videos: VideosService) {}

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
