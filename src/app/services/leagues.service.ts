import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  private apiUrl = 'https://v3.football.api-sports.io';
  private apiKey = 'e4bf08371a3939b5a303e81f9aad2a39';
  private season = 2023;

  constructor(private http : HttpClient) { }

  getLeaguesByCountry(country : string) : Promise<any>{
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/leagues?country=${country}`, options)
    .toPromise();
  }

  getLeaguesByName(name : string) : Promise<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/leagues?search=${name}`, options)
    .toPromise();
  }

  getLeagueById(id : number) : Promise<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/leagues?id=${id}`, options)
    .toPromise();
  }

  
  getStandingById(id : number) : Promise<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(`${this.apiUrl}/standings?league=${id}&season=${this.season}`, options)
    .toPromise();
  }
}
