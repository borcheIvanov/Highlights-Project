import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Video } from 'src/app/models/video.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() video: Video = {
    id: 0,
    url: '',
    title: 'NBA Where amazing happens',
    description: 'Choose a video from the highlight playlist to start watching',
    index: -1
  };

  url: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizeUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.video.currentValue) {
      this.sanitizeUrl();
    }
  }

  sanitizeUrl() {
    const notSanitized = this.video ? this.video.url : 'https://www.youtube.com/embed/y3jVZQuYo8A?autoplay=1';
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(notSanitized);
  }
}
