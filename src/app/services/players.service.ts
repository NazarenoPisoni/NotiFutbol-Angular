import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private apiUrl = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php';

  constructor(private http : HttpClient) { }

  searchPlayersByName(name : string) : Observable<any>{
    const url = `${this.apiUrl}?p=${name}`;
    return this.http.get(url).pipe(
      map((response : any) => response.player),
      catchError(() => of([]))
    );
  }
}
