import { Component, OnInit } from '@angular/core';
import { VideosService } from './services/videos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from './video.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  currentYear : number;
  videos : any = [];

  currentVideo : Video = {
    id: 0,
    url: '',
    title: 'NBA Where amazing happens',
    description: 'Choose a video from the highlight playlist to start watching',
    index: -1
  }



  constructor(private _videos:VideosService, public sanitizer: DomSanitizer) {

  }

  ngOnInit(){
    this.getVideos();
    this.getCurrentYear();
  }

  getCurrentYear(): void {
    let year:number = (new Date()).getFullYear();
    this.currentYear = year;
  }



  filterVideos(){
    console.log("filtering videos");
    var filteredVideos = [];
    this.videos.forEach(video => {
      if (video.snippet.title.indexOf('Quarter') == -1) {
        filteredVideos.push(video);
      }
    });

    this.videos = filteredVideos;
  }

  getVideos(){
    this._videos.getVideos().subscribe((res) => {
                                        this.videos = res.items;
                                        this.filterVideos();
                                      },
                                      (err) => console.log(err));
  }

  playVideo(videoId:number, title:string, desc:string, i:number){
    this.currentVideo = {
      id: videoId,
      url: 'https://www.youtube.com/embed/' + videoId + '?autoplay=1',
      title: title,
      description: desc,
      index: i
    } as Video;

    console.log(this.currentVideo);
  }

  isVideoSelected():boolean{
    return this.currentVideo.url != "";
  }

  playNext(){
    var nextVideoIndex = this.currentVideo.index + 1;
    var nextVideo = this.videos[nextVideoIndex];
    this.playVideo(nextVideo.id.videoId, nextVideo.snippet.title, nextVideo.snippet.description, nextVideoIndex);
  }

  playPrevious(){
    var previousVideoIndex = this.currentVideo.index - 1;
    var previousVideo = this.videos[previousVideoIndex];
    this.playVideo(previousVideo.id.videoId, previousVideo.snippet.title, previousVideo.snippet.description, previousVideoIndex);
  }

}
