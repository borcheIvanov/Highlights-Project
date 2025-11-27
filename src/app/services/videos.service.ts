import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YouTubeData } from '../models/youtube-data.interface';
import { ConfigurationService } from './configuration.service';
import { Playlist } from '../models/playlist.interface';

@Injectable()
export class VideosService {

  order = 'date';
  maxResults = 50;
  key = '';

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.key = configurationService.youTubeKey;
  }

  getVideos(playlist: Playlist): Observable<{ items: YouTubeData[] }> {
    const key = `key=${this.key}`;
    const part = 'part=snippet,id';
    const order = `order=${this.order}`;
    const maxResults = `maxResults=${this.maxResults}`;

    const params = `${key}&${playlist.url}&${part}&${order}&${maxResults}`;
    return this.http.get<{ items: YouTubeData[] }>(
      `https://www.googleapis.com/youtube/v3/search?${params}`
    );
  }

  getList(): Playlist[] {
    return [
      { title: 'Premier League', url: 'channelId=UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['PREMIER LEAGUE'] } },
      { title: 'La Liga', url: 'channelId=UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['LA LIGA'] } },
      { title: 'Seria A', url: 'channelId=UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['SERIE A'] } },
      { title: 'Champions League', url: 'channelId=UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['UEFA CHAMPIONS LEAGUE'] } }
    ] as Playlist[];
  }
}
