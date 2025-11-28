import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, defer, map, expand, reduce, of, shareReplay, catchError, tap, finalize } from 'rxjs';
import { YouTubeData } from '../models/youtube-data.interface';
import { ConfigurationService } from './configuration.service';
import { Playlist } from '../models/playlist.interface';

@Injectable()
export class VideosService {

  order = 'date';
  maxResults = 50;
  key = '';
  private cache = new Map<string, { timestamp: number; items: YouTubeData[] }>();
  private inFlight = new Map<string, Observable<{ items: YouTubeData[] }>>();
  private timeToLiveInMinutes = 60 * 60 * 1000;

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.key = configurationService.youTubeKey;
  }

  getVideos(playlist: Playlist): Observable<{ items: YouTubeData[] }> {
    const channelId = playlist.channelId;

    const cached = this.cache.get(channelId);
    const now = Date.now();
    if (cached && (now - cached.timestamp) < this.timeToLiveInMinutes) {
      return of({ items: cached.items });
    }

    const inFlightReq = this.inFlight.get(channelId);
    if (inFlightReq) {
      return inFlightReq;
    }

    type YouTubeSearchResponse = {
      items: YouTubeData[];
      nextPageToken?: string;
    };

    const key = `key=${this.key}`;
    const part = 'part=snippet,id';
    const order = `order=${this.order}`;
    const maxResults = `maxResults=${this.maxResults}`;
    const typeParam = 'type=video';

    const base = `https://www.googleapis.com/youtube/v3/search?${key}&channelId=${channelId}&${part}&${order}&${maxResults}&${typeParam}`;

    const fetchPage = (pageToken?: string): Observable<YouTubeSearchResponse> => {
      const url = pageToken ? `${base}&pageToken=${pageToken}` : base;
      return this.http.get<YouTubeSearchResponse>(url).pipe(
        catchError(() => of({ items: [] } as YouTubeSearchResponse))
      );
    };

    const request$ = defer(() => fetchPage()).pipe(
      expand(res => res.nextPageToken ? fetchPage(res.nextPageToken) : EMPTY),
      map(res => res.items || []),
      reduce((all, items) => all.concat(items), [] as YouTubeData[]),
      map(items => ({ items })),
      tap(result => this.cache.set(channelId, { timestamp: Date.now(), items: result.items })),
      finalize(() => this.inFlight.delete(channelId)),
      shareReplay(1)
    );

    this.inFlight.set(channelId, request$);
    return request$;
  }

  getList(): Playlist[] {
    return [
      { title: 'Premier League', channelId: 'UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['PREMIER LEAGUE'] } },
      { title: 'La Liga', channelId: 'UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['LA LIGA'] } },
      { title: 'Seria A', channelId: 'UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['SERIE A'] } },
      { title: 'Champions League', channelId: 'UC-SYaiaBb5P-xcNTzcvkqkA', query: { excludes: [], includes: ['UEFA CHAMPIONS LEAGUE'] } }
    ] as Playlist[];
  }
}
