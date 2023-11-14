import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: any[] = [];

  private apiUrl = 'https://newsapi.org/v2/everything?q=futbol%argentino&language=es&sortBy=popularity';
  private apiKey = '672c52155a6c4e08afbfee2e2684a2f3';

  constructor(private http : HttpClient) {}

  getNews(): Promise<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(this.apiUrl, options)
    .toPromise();

  }

  getNewsByName(name: string) : Promise<any> {
    const url = `https://newsapi.org/v2/everything?q=${name}&language=es&sortBy=popularity&apiKey=${this.apiKey}`;

    return this.http.get(url)
    .toPromise();
  }

}
