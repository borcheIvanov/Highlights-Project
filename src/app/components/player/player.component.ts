import { Component, OnInit, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Video } from 'src/app/models/video.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges {
  sanitizer = inject(DomSanitizer);

  @Input() video: Video = {
    id: 0,
    url: '',
    title: '',
    description: '',
    index: -1
  };

  url?: SafeResourceUrl;

  ngOnInit() {
    this.sanitizeUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.video.currentValue) {
      this.sanitizeUrl();
    }
  }

  sanitizeUrl() {
    const notSanitized = this.video && this.video.url ? this.video.url : '';
    this.url = notSanitized ? this.sanitizer.bypassSecurityTrustResourceUrl(notSanitized) : undefined;
  }
}
