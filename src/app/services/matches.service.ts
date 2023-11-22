import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  matches : any[] = [];

  private apiUrl = 'https://v3.football.api-sports.io';
  private apiKey = 'e4bf08371a3939b5a303e81f9aad2a39';
  private season = 2023;
  
  constructor(private http : HttpClient) { }

  getMatchesByDate(date : string) : Promise<any>{
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/fixtures?date=${date}`, options)
    .toPromise();
  }

  getMatchById(id : number) : Promise<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/fixtures?id=${id}`, options)
    .toPromise();
  }

  getMatchByTeamId(teamId : number) : Promise<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/fixtures?season=${this.season}&team=${teamId}`, options)
    .toPromise();
  }
  
}
