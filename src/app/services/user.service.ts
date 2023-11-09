import { Injectable } from '@angular/core';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  private localStorageKey = 'users';

  setUser(user : user) {
    const users = this.getUsers();
    users[user.email] = user;
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  getUser(email : string) : user | null {
    const users = this.getUsers();
    return users[email] || null;
  }

  autenticateUser(email : string, password : string) : boolean | null{
    const user = this.getUser(email);
    return user && user.password === password;
  }

  private getUsers() : {[email : string] : user} {
    const usersData = localStorage.getItem(this.localStorageKey);
    return usersData ? JSON.parse(usersData) : {};
  }
}
