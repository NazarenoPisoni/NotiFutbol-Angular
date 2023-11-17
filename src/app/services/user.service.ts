import { Injectable } from '@angular/core';
import { user } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private idCounter = 0;
  private user: user | undefined;

  constructor(private router : Router,
              private http : HttpClient) { }

  url: string = 'http://localhost:4000/users';
  
  private localStorageKey = 'users';

  getNextId(): number {
    return ++this.idCounter;
  }

  getUsers() : Observable<user[]> {
    return this.http.get<user[]>(this.url);
  }

  async getUser(id: number) : Promise<user | undefined> {
    try {
      const result = await fetch(`${this.url}/${id}`);
      const user = await result.json();
      return user;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async postUser(user : user) {
    try {
      await fetch(this.url,
                {
                  method: 'POST',
                  body: JSON.stringify(user),
                  headers: {
                    "Content-type": "application/json"
                  }
                }
      )
      this.router.navigate(['home']);                
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id : number) {
    try {
      await fetch (`${this.url}/${id}`,
                  {method: 'DELETE'}
        )
      window.location.href = 'index.html';
    } catch (error) {
      console.log(error);
    }
  }

  async putUser(user: user) {
    try {
      await fetch(`${this.url}/${user.id}`,
                {method: 'PUT', body: JSON.stringify(user), headers: {'Content-type': 'application/json'}})
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
    }
  }

  verifyUserAndPass(email: any, password: any) {
    this.getUsers().subscribe(users => {
      users.find(u => {
        if(u.password === password && u.email === email) {
          this.user = u;
          localStorage.setItem('token', u.id.toString());
          this.router.navigate(['/user-home']);
        }
      });
    });
  }

  checkStatusAutentication(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if(!token) {
      return of(false)
    }
    return this.http.get<user>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.user = u),
        map(u => !!u),
        catchError(err => of(false))
      )
  }

  get currentUser(): user | undefined {
    if(!this.user) return undefined
    //structuredClone(this.user)  Cuando es muy grande el Objeto conviene usar esto
    return { ...this.user }; //Devuelve una copia de ese Objeto
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
