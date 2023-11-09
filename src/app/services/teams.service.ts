import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private apiKey = 'e4bf08371a3939b5a303e81f9aad2a39';

  constructor(private http : HttpClient) { }

  getCountries() : Promise<any> {
    const apiUrl = 'https://v3.football.api-sports.io/countries';

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(apiUrl, options)
    .toPromise();
  }

  getTeamsByCountry(country : string) : Promise<any> {
    const apiUrl = `https://v3.football.api-sports.io/teams?country=${country}`;

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(apiUrl, options)
    .toPromise();
  }

  getTeamsByName(name : string) : Promise<any> {
    const apiUrl = `https://v3.football.api-sports.io/teams?search=${name}`;

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });

    const options = { headers: headers };

    return this.http.get(apiUrl, options)
    .toPromise();
  }

}
