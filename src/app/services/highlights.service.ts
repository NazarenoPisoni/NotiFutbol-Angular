import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  constructor(private http : HttpClient,
              private sanitizer : DomSanitizer) { }

  getHighlights() : Promise<any> {
    return this.http.get('https://www.scorebat.com/video-api/v3/feed/?token=MTI4OTUyXzE2OTk3MjgzOTFfOGE4Y2VlMDc3YTUyMjMzZTEzNjA3ZGRlZDdjMTVhYmIyMTVhZTAwNg==')
    .toPromise()
    .then((data: any) => {
      if(data.response && data.response.length > 0) {
        data.response.forEach((highlight: any) => {
          this.sanitizeVideos(highlight.videos);
        });
      }
      return data;
    });
  }

  private sanitizeVideos(videos: any) {
    if(videos && videos.length > 0) {
      videos.forEach((video: any) => {        
        video.embed = this.sanitizer.bypassSecurityTrustHtml(video.embed) as SafeHtml;
      })
    }
  }

}
