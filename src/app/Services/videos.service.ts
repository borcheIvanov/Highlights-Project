import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()

export class VideosService{
    
    constructor(private http : HttpClient) { }

    getVideos():Observable<any>{
        return this.http.get<any>("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAOyIE_mx4lmr419ZM1nhA6Xy8z4WDrhfQ&channelId=UCLd4dSmXdrJykO_hgOzbfPw&part=snippet,id&order=date&maxResults=50");
    }

}