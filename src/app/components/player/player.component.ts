import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/app/models/video.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() currentVideo: Video = {
    id: 0,
    url: '',
    title: 'NBA Where amazing happens',
    description: 'Choose a video from the highlight playlist to start watching',
    index: -1
  };

  constructor() {}

  ngOnInit() {}
}
