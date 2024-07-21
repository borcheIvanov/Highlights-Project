import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YouTubeData } from '../models/youtube-data.interface';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class VideosService {

  order = 'date';
  maxResults = 50;
  key = '';

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.key = configurationService.youTubeKey;
  }

  getVideos(): Observable<{ items: YouTubeData[] }> {
    const params = `key=${this.key}&channelId=UCLd4dSmXdrJykO_hgOzbfPw&part=snippet,id&order=${this.order}&maxResults=${this.maxResults}`;
    return this.http.get<{ items: YouTubeData[] }>(
      `https://www.googleapis.com/youtube/v3/search?${params}`
    );
  }
}
